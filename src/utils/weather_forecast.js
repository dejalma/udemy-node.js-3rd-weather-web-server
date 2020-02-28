const request = require('request')

const weather_forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/f1d6089796845c6d3f07739c0bd65f37/' +
    latitude + ',' + longitude + 
    '?units=si&lang=en'

    request.get({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to finde location!', undefined)
        } else {
            temperatureNow = body.currently.temperature;
            precipProbability = body.currently.precipProbability;
            summaryToday = body.daily.data[0].summary;

            callback(undefined, {
                text: `${summaryToday} It is currentely ${temperatureNow}ºC. There is a ${precipProbability}% chance of rain.`,
                temperatureNow,
                precipProbability,
                summaryToday
            })
        }
    }) 
}

module.exports = weather_forecast