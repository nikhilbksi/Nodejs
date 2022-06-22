const express= require('express');
require('./db/mongoose');               //makes sure that mongoose runs and connection is made with the DB
const userRouter= require('./routers/users');
const taskRouter= require('./routers/tasks');

const app= express();
const port= process.env.PORT || 3000 ;

// express middleware: new request-> do something-> run route handler
// to be used for authenticating the tokens; the routers are not executed until next() is declared
// app.use((req, res, next)=>{
//     if(req.method === 'GET')
//     {
//         res.send('GET requests disabled');
//     }
//     else
//     {
//         next();     //proceeds to the reqd router
//     }
// });

// maintainence middleware message
// app.use((req, res, next)=>{
//     res.status(503).send('Site under maintainence, please try again later');
// });

//setting up middleware for specific requests


app.use(express.json());        //express automatically parses the incoming data as json
app.use(userRouter);
app.use(taskRouter);

app.listen(port, ()=>{
    console.log('Server is up on port '+port);
});