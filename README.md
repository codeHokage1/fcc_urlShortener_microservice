# URL Shortener Microservice

This is a project done in completion of my Backend & API development course on FreeCodeCamp. It returns a shortned URL, that can be redirected to the original website

Link to live API :link: : https://fcc-timestamp-microservice-one.vercel.app

```
GET / 
// displays the homepage

GET /api/hello
// returns a json response to say hello

GET /api/shorturl/:url
// redirects to the equivalent orginal url of the shorturl

POST /api/shorturl
{
    "original_url" : "http://www.xyz.com"
}
// returns a json response of the orginal url and the equivalent shorturl
```

:warning: **Note**: that the POST request parameter has to be in the correct date format: https://www.xyz.com. Any format aside this, would return an error message json

