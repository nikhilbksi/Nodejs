const forecast= require('./utils/forecast');
const geocode= require('./utils/geocode');
const path= require('path');
const express= require('express');
const hbs= require('hbs');

const app= express();

app.set('view engine', 'hbs');                                        //set used for setting value for an express: key-value; hbs- handlebar template
app.set('views', path.join(__dirname,'../templates/views'));          //providing express the path to the hbs templates
hbs.registerPartials(path.join(__dirname,'../templates/partials'));
app.use(express.static(path.join(__dirname,'../public')));            //providing path to the statuc assets in public folder to express

app.get('', (req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Nikhil'
    });
});

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About',
        name: 'Nikhil'
    });
});

app.get('/help', (req,res)=>{
    res.render('help',{
        title: 'Help Page',
        name: 'Nikhil',
        txt: 'this is some text'
    });
});
app.get('/help/*', (req,res)=>{
    res.render('error', {
        title: '404 error page',
        txt: 'Help data not found',
        name: 'Nikhil'
    });
});

app.get('/weather', (req,res)=>{

    if (!req.query.address){                                //makes address term cumpulsory 
        return res.render('error',{                         //exits the get func is there is no search
            title: '404 error page',
            txt: 'Address must be provided',
            name: 'Nikhil'
        });
    }

    geocode(req.query.address, (error,data)=>{
        if (error) {
            return res.render('error',{                         
                title: '404 error page',
                txt: error,
                name: 'Nikhil'
            });
        }

        forecast(data.latitude, data.longitude, (error, weather)=>{
            if (error) {
                return res.render('error',{                         
                    title: '404 error page',
                    txt: error,
                    name: 'Nikhil'
                });
            }

            return res.render('weather',{
                title: 'Weather App',
                location: data.place,
                forecast: weather.des,
                temp: weather.temp,
                feelsLike: weather.feel,
                name: 'Nikhil'
            });
        });
    });
});

app.get('*', (req,res)=>{
    res.render('error', {
        title: '404 error page',
        txt: 'Page not found',
        name: 'Nikhil'
    });
});

app.listen(3000,()=>{
    console.log('Server started on port 3000');
});