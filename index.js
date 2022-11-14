require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const dns = require('dns');
const url = require('url').URL;
const connectDB = require('./config/dbConfig')
const UrlModel = require('./models/url')
const { v4: uuidv4 } = require('uuid');


// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use('/public', express.static(__dirname + `/public`));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});


// endpoint to create a short url
app.post('/api/shorturl', (req, res) => {
  const urlToShorten = req.body.url;
  try {
    const url2 = new url(urlToShorten);
    const newUrl = {
      "original_url": urlToShorten,
      "short_url": uuidv4().slice(0, 4)
    }
    UrlModel.create(newUrl, (err, data) => {
      if (err) return res.status(500).json({ "error": err.message })
      res.json({...newUrl})
    }) 
  } catch (error) {
    return res.json({ "error": "invalid url" })
  }
})


// endpoint to redirect shorturl to original website
app.get('/api/shorturl/:url', (req, res) => {
  const urlToConvert = req.params.url;
  UrlModel.findOne({
    "short_url": urlToConvert
  }, (err, result) => {
    if (err) return res.status(500).json({ "message": err.message })
    res.redirect(result.original_url);
  })
})


//connect database and listen to port
const connectAndListen = async () => {
  try {
      await connectDB();
      app.listen(port, function() {
        console.log(`Listening on port ${port}`);
      });
  } catch (error) {
      console.log(error.message);        
  }
}


connectAndListen();
