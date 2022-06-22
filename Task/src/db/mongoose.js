const mongoose= require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/Task-Manager-api',{
    useNewUrlParser: true
    // useFindAndModify: false,
    // useCreateIndex: true
});


// command for starting mongo server:
//'C:\Users\dell 5593\OneDrive\Desktop\Program\DATABASE\mongodb\bin\mongod.exe' --dbpath='\Users\dell 5593\OneDrive\Desktop\Program\DATABASE\mongodb-data'