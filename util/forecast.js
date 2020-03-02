const request = require('request')
const forecast = (longtitude,latitude,callback) => {
    
    const url = 'https://api.darksky.net/forecast/cf99451c38158b08ab00a4fe8d45d0c9/'+longtitude+','+latitude+'?units=si'
    request({url,json: true},(error,{body}) => {
        if(error,undefined){
            callback('Error ',undefined)
        }else {
            const data = body.currently
            callback(undefined,body.daily.data[0].summary +' It is currently '+data.temperature +' %c degree out.there is a '+data.precipProbability +' % chance of rain.')
        }
    })
}
module.exports = forecast