const request = require('request');

const forecast = (latitude, Longitude, callback) => {
    const url = 'http://api.weatherapi.com/v1/current.json?key=b82617b8740a4a6399333429201310&q='+latitude+','+Longitude;
    request({ url: url, json: true}, (error, response) => {
        if(error){
            callback('Unable to connect service !', undefined);
        }else if(response.body.error){
            callback('Unable to find location !', undefined);
        }else{
            callback(undefined, {
                Temp  : response.body.current.temp_c,
                Preci: response.body.current.precip_mm,
                Location : response.body.location.name
            });

        }

    })
}

module.exports = forecast;