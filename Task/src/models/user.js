const mongoose= require('mongoose');
const validator= require('validator');
const bcrypt= require('bcrypt');
const jwt= require('jsonwebtoken');
const Tasks= require('./task');

const userSchema= mongoose.Schema({      //the object can be directly put in mongoose.model() as mongoos can automatically create the schema
    name: {
        type: String,
        required: true,          //this field entry is required: in-built validator
        trim: true
    },
    email:{
        type: String,
        unique: true,
        required: true,
        trim: true,             //trims any empty spaces at the beginning or end of the string
        lowercase: true,        //turns the string to all lowercase
        validate(val){
            if(!validator.isEmail(val))
            {
                throw new Error('Entered email is invalid');
            }
        }
    },
    password:{
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(val){
            if(val.toLowerCase().includes('password'))
            {
                throw new Error('Password cannot include "password"');
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(val) {         //custom validator to check the value of age field
            if(val<0)
            {
                throw new Error('Age cannot be negative');
            }
        }
    },                     //the specified types helps in validating the entered data
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

//indicates a relation between tasks and user
userSchema.virtual('tasks', {               //doesn't actually stores a task in DB like owner field in Tasks
    ref: 'Tasks',               //reference
    localField: '_id',          //local data is stored
    foreignField: 'owner'       //name of field in Tasks that sets up the relation
});

// adding an instance method for generating token: applicable on an instance
userSchema.methods.generateToken= async function() {
    const user=this;

    const token= jwt.sign({ _id: user._id.toString() }, 'nodecourse');  
    // sign func takes 2 string params: object value to be encoded and a secret

    user.tokens= user.tokens.concat({token});
    await user.save();
    return token;
}

userSchema.methods.toJSON= function() {
    const user= this;
    const userObject= user.toObject();

    delete userObject.password;
    delete userObject.tokens;
    return userObject;
}

// adding a new static method (applicable on a model) to Users for login function
userSchema.statics.findByCredentials = async(email,password)=>{
    const user= await Users.findOne({email: email});
    if(!user)
    {
        throw new Error('Unable to log in');
    }

    const match= await bcrypt.compare(password, user.password);     //password is the entered password in plain text
    if(!match)
    {
        throw new Error('Unable to login');
    }
    return user;
}


// MIDDLEWARE
//pre(save): before saving the object; also can be pre(validate)
userSchema.pre('save', async function(next) {         //cannot use arrow fundtion as arrow functions don't bind 'this'
    const user= this;   //individual user about to be saved

    if(user.isModified('password'))
    {
        user.password= await bcrypt.hash(user.password, 8);     //performs the hashing cycle 8 times
    }

    next();     //marks the end of func
});    

// delete all user tasks when user is deleted 
userSchema.pre('remove', async function(next) {
    const user= this;
    await Tasks.deleteMany({owner: user._id});

    next();
});

//Users is a constructor func that accepts the reqd vals as its parameter
const Users= mongoose.model('Users', userSchema);

module.exports= Users;