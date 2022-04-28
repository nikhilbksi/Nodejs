const express= require('express');

const app= express();

app.get('',(req,res)=>{
    res.send('hello there');
});
app.get('/help', (req,res)=>{
    res.send('Help page');
});
app.get('/weather', (req,res)=>{
    res.send('View weather');
});

app.listen(3000,()=>{
    console.log('Server started on port 3000');
});