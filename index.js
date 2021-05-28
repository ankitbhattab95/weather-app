const express = require('express')
const app = express()
const config = require('./config/config')
const request = require('request');
const cors = require("cors");
const path = require('path')
const port = 3001

app.use(cors())
app.post('/', async (req, res) => {
    let url = config.baseUrl + req.query.city
    request(url, function (err, response, body) {
      if(err){
        console.log('error:', err);
      } else {
        console.log('body:', body);
      }
      res.send(err || JSON.parse(response.body))
    });
})

app.use(express.static(path.join(__dirname, 'client/weather/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/weather/build/index.html'));
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})