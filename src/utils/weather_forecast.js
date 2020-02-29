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
            const currently = body.currently;

            temperature = currently.temperature;
            apparentTemperature = currently.apparentTemperature;
            precipProbability = currently.precipProbability;

            const dailyToday = body.daily.data[0];

            temperatureHigh = dailyToday.temperatureHigh;
            temperatureLow = dailyToday.temperatureLow;
            summary = dailyToday.summary;

            callback(undefined, {
                text: `${summary} It is currently ${temperature}ºC, with apparent temperature of ${apparentTemperature}ºC. This high today is ${temperatureHigh}ºC with a low of ${temperatureLow}ºC. There is a ${precipProbability}% chance of rain.`,
                temperature,
                apparentTemperature,
                temperatureHigh,
                temperatureLow,
                precipProbability,
                summary
            })
        }
    }) 
}

module.exports = weather_forecast