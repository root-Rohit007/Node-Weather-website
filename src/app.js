const express = require('express');
const path = require('path');
const hbs = require('hbs');
const forecast = require('./utils/forecast.js');
const geocode = require('./utils/geocode.js');
const request = require('request');

const app = express();
const port = process.env.PORT || 3000;

//define paths for express configuration
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup hsb and views location
app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirPath));
 
app.get('', (req, res)=> {
    res.render('index', {
        title: 'Weather ',
        name : 'Rohit Thakare'
    }) 
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About',
        name : 'Rohit Thakare'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'help',
        name : 'Rohit Thakare'
    })
})

app.get('/help/*', (req, res) => {
    res.render('my404', {
        title : "Something went wrong",
        message: "Try something different", 
        errorMessage : 'Help not found', 
        name : 'Rohit thakare'
    })
})

app.get('/product', (req, res)=>{

    if(!req.query.serch){
        return res.send({ // Stop fun here
            error: 'You must provide serch term'
        })
    }

    console.log(req.query);
    res.send({
        product: []
    })
})

app.get('/weather', (req,res)=>{
    if(!req.query.serch){
        return res.send({
            error: "You shoud proovid a address to search a weather"
        });
    }

    const address = req.query.serch;

    geocode(address, (error, data) => {
        if (error == undefined) {
            // console.log('data', data);
            // console.log("Forecast: ");
            // res.send({
            //     data : data,
            // })
            const location = data;
            forecast(data.latitude, data.longitude, (error, data) => {
                if (error == undefined) {
                    res.send({
                        location : location,
                        forecast : data,
                    })
                } else {
                    // console.log('Error : ', error);
                    res.send({
                        error: error,
                    })
                }
            })
        } 
        else {
            // console.log('Error', error);
            res.send({
                error: error,
            })
        }

    })
})



app.get('*', (req, res)=>{
    res.render('my404',{
        title : "Something went wrong",
        message: "Try something different", 
        errorMessage : 'Page not found', 
        name : 'Rohit thakare'
    });
})

app.listen(port, ()=>{
    console.log('Server is up and and running on port ' + port);
}) 