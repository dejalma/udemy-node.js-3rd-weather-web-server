const request = require('request')

const geolocation = (address, callback) => {
    const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/' +
    encodeURIComponent(address) +
    '.json?language=en&limit=1&access_token=pk.eyJ1IjoiZGVqYWxtYSIsImEiOiJjazZqYWJsNXQwNTZsM2txbmJ4eHN2YzdiIn0.fbgjyhjJkJ7zqFGyKVTRcQ'
    
    request.get({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to geolocation service!', undefined)
        } else if(body.message || body.features.length === 0) {
            callback('Unable to find location! Try another search.', undefined)
        } else {
            const place = body.features[0]
            callback(undefined, {
                latitude: place.center[1],
                longitude: place.center[0],
                location: place.place_name
            })
        }
    })
}

module.exports = geolocation