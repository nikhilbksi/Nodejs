const {MongoClient, ObjectId}= require('mongodb');


const connectionURL= 'mongodb://127.0.0.1:27017';
const databaseName= 'Task-Manager';

const id= new ObjectId();   //randomly generates a new object id
//object id = 12bytes: first 4 bytes= timestamp
console.log(id);
console.log(id.getTimestamp());

MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client)=>{          //either error pr client data can exist- connection was unsuccessful if error exists             

    if(error)
    {
        return console.log('Unable to connect to database');        //return stops the function execution
    }

    const db= client.db(databaseName);      //automatically creates the reqd db of given name

// inserting/create

    // insertOne
    // db.collection('Users').insertOne({      //inserts one entry into the collection- accepts objects as entry
    //     _id: id,
    //     name: 'Vikram',
    //     age: 26
    // }, (error, result)=>{                //insert is also an async func, hence callback func can be used
    //     if(error)
    //     {
    //         return console.log('Unable to insert user');
    //     }

    //     console.log(result.ops);        //.ops contains all the docs that were inserted
    // });     

    // insertMany
    // db.collection('Users').insertMany([     //inserts multiple objects into the collection
    //     {
    //         name:'Pop',
    //         age: 69
    //     },
    //     {
    //         name: 'ok',
    //         age: 29
    //     }
    // ], (error, result)=>{
    //     if(error)
    //     {
    //         return console.log('Unable to insert values');
    //     }

    //     console.log(result.ops);
    // });

    // db.collection('Tasks').insertMany([
    //     {
    //         description: 'Get groceries',
    //         completed: false
    //     },
    //     {
    //         description: 'Read book',
    //         completed: true
    //     },
    //     {
    //         description: 'Clean room',
    //         completed: false
    //     }
    // ], (error, result)=>{
    //     if(error)
    //     {
    //         return console.log('Unable to insert tasks');
    //     }

    //     console.log(result.ops);
    // });


// searching/read

    // findone
    // db.collection('Users').findOne({ name:'Nikhil', age:20 }, (error,result)=>{     
    //     if(error)
    //     {
    //         return console.log('Unable to find given data');
    //     }
    //     console.log(result);
    // });     //if multiple objects with similar values exist then it returns the first one
    //to find object by id, we pass: {_id: new ObjectID("<object-id>")}

    // find-toArray
    // db.collection('Users').find( {age:69} ).toArray( (error,result)=>{      //find returns a cursor: pointer to the reqd data 
    //     if(error)
    //     {
    //         return console.log('Unable to fetch');
    //     }
    //     console.log(result);
    // });
    // db.collection('Tasks').find( {completed:false} ).toArray((error,result)=>{
    //     if(error)
    //     {
    //         return console.log('Unable to fetch');
    //     }
    //     console.log(result);
    // });

// update

    // updateone
    // db.collection('Users').updateOne({_id: new ObjectId("62a57d94838c8465be69bc3d")},     //update parameter 1: for searching the reqd doc
    // { $set: {                                                               //update parameter 2: for updating the reqd doc
    //     name: 'OK'
    // }}).then((result)=>{                                                    //returns a promise by default if no callback is passed
    //     console.log(result);
    // }).catch((error)=>{
    //     console.log(error);
    // });

    // updatemany
    // db.collection('Tasks').updateMany({ completed: false}, 
    // { $set: {
    //     completed: true
    // }}).then((result)=>{
    //     console.log(result);
    // }).catch((error)=>{
    //     console.log(error);
    // });

// delete

    db.collection('Users').deleteMany({age:69}).then((result)=>{
        console.log(result);
    }).catch((error)=>{
        console.log(error);
    });

});    //connection is a async process hence callback function is used- called when connection is made 