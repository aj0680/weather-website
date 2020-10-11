const request = require('request');

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=4809e9baa266422ffc478eab38337b8a&query='+ lat +','+ long +'&units=m'

    request({ url, json: true }, (error, { body }) => {
    if(error){
        callback('Unable to connect to weather service', undefined)
    }
    else if(body.error){
        callback('Unable to find location', undefined)
    }
    else{
        callback(undefined, body.current.weather_descriptions[0] + '. It is currently: '+body.current.temperature+' degrees out It feelslike: '+body.current.feelslike)
    }
})
} 

module.exports = forecast