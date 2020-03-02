const forecast = require('../util/forecast')
const geocode = require('../util/geocode')
const path = require('path')
const express = require('express')

const app = express()

const pathDirectory = path.join(__dirname,'../public')
const helpPath = path.join(pathDirectory,'help.html')
const aboutPath = path.join(pathDirectory,'about.html')


app.set('view engine','hbs')
app.use(express.static(pathDirectory))
// app.use('/help',express.static(helpPath))
// app.use('/about',express.static(aboutPath))

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'about page',
        name: 'name'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title: 'help page',
        name: 'name'
    })
})

app.get('/weather',(req,res) => {

    if(!req.query.location){
        return res.send('you must provide the location')
    }

    geocode(req.query.location,(error,{latitude,longtitude,location} = {}) => {
          if(error) {
              return res.send({ error })
          }

          forecast(longtitude,latitude,(error,forecastData)=>{
              if(error){
                  return res.send({error})
              }

              res.send({
                  forecast: forecastData,
                  location,
                  address:req.query.location
              })
          })
    })
})

app.listen(4000,() => {
    console.log('port listening at 4000')
})