const request= require('request');

const forecast=(lat,long,callback) =>{
    const url= 'http://api.weatherstack.com/current?access_key=8793906324fc6517754df344e3c09544&query='+ lat+ ','+ long+ '&units=f';

    request({url: url, json:true}, (error,response)=>{
        if (error) {
            callback('Unable to connect to weather service.',undefined);
        }
        else if (response.body.error) {
            callback('Unable to find location.',undefined);
        }
        else{
            callback(undefined,{
                des: response.body.current.weather_descriptions[0],
                temp: response.body.current.temperature,
                feel: response.body.current.feelslike
            })
        }
    });
}

module.exports= forecast;