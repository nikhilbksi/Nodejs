const geocode= require('./utils/geocode');
const forecast= require('./utils/forecast');

const address= process.argv[2];

if (!address) {
    console.log('Please enter an address.');
}
else{
    geocode(address,(error,data)=>{
        if (error) {
            return console.log('Error: '+ error);
        }
        forecast(data.latitude,data.longitude,(error, fdata)=>{
            if (error) {
                return console.log('Error: '+error);
            }
            console.log('Location: '+ data.place);
            console.log(fdata.des+ ': It is '+ fdata.temp+ ' F but it feels like '+ fdata.feel+ 'F out today.');
    
        });
    });
}