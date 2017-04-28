# IoT-Sentiment-Analysis-API
Restful web API for sentiment analysis used in the mobile app for IoT course team project.

## Deployment
available on Heroku: 

## Usage
POST to the URL with json data (the "text" key is required, and its coresponding value is the text needed to be analyzed.
```
{
  "text": "I am feeling happy."
}
```

The api will return a JSON response back
```
{
  "emotion": "joy"
}
```
The emotion have five differnt posibilities: joy, anger, sadness, fear, surprise.

