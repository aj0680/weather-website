const path = require('path');
const express = require('express')
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public/')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ajay'
    })
})

app.get('/about', (req, res) => {
    res.render('about',  {
        title: 'About myself',
        name: 'Ajay'
    })
})

app.get('/help', (req, res) => {
    res.render('help',  {
        helpText: 'This is the help paragraph',
        title: 'Help',
        name: 'Ajay'
    })
})



app.get('/weather', (req, res) => {
    if(!req.query.address)
        return res.send({
          error: 'Please enter address'
        })

        geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
            if(error) {
                return res.send({ error })
            }
            forecast(latitude, longitude, (error, forecastData) => {
                if(error) {
                    return res.send({ error })
                }

                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
            })
        })

})

app.get('/products', (req, res) => {
    if(!req.query.search)
        return console.log('Please enter search term')
  
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ajay',
        errorMsg: 'Help not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ajay',
        errorMsg: 'Error 404 page not found'
    })
})

app.listen(port, () => {
    console.log('server is up on port '+port)
})

