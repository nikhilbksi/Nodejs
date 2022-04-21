const fs= require('fs');

const databuffer= fs.readFileSync('data.json');  //returns value in binary
const datajson= databuffer.toString();  //to transform binary to string
const data= JSON.parse(datajson);  //to parse json object to js object

data.name= 'Nikhil';
data.age= 20;

const ndatajson= JSON.stringify(data);
fs.writeFileSync('data.json',ndatajson);