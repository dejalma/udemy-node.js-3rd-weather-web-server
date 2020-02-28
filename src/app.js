const geolocation = require('./utils/geolocation');
const weather_forecast = require('./utils/weather_forecast');

const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

const publicDir = path.join(__dirname, '../public');
app.use(express.static(publicDir));

const templateDir = path.join(__dirname, '../templates/views');
app.set('view engine', 'hbs');
app.set('views', templateDir);

const partialsDir = path.join(__dirname, '../templates/partials');
hbs.registerPartials(partialsDir);

const name = 'Dejalma Arantes';
const email = 'dejalma.arantes@gmail.com';

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ error: 'Address is required.' });
    }

    const address = req.query.address;

    geolocation(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }

        weather_forecast(latitude, longitude, (error, data) => {
            if (error) {
                return res.send({ error });
            }

            res.send({
                forecast: data,
                location,
                address
            });
        })
    });
})

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather service',
        name,
        email
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help me',
        text: 'Some help topics',
        name,
        email
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About the weater service',
        name,
        email
    });
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error',
        errorMessage: 'Help article not found.',
        name,
        email
    });
})


app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error',
        errorMessage: 'Page not found.',
        name,
        email
    });
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
})
