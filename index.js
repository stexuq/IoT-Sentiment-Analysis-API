var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.set('port', (process.env.PORT || 5000));

// set up a default router
var router = express.Router();

// indicio specific
var indico = require('indico.io');
var apikey = require('./apikey');
var key = apikey.apikey();
indico.apiKey = key;

var response = function(res) { console.log(res); }
var logError = function(err) { console.log(err); }

// routing
router.route('/')
    .post(function(req, res) {
        var text = req.body["text"];
        console.log(text);
        //res.json(jsonData);
        indico.emotion(text)
        .then(function(result) {
            var max = 0;
            var emotions = ["anger", "joy", "fear", "sadness", "surprise"];
            for (var i = 0; i < emotions.length; i++) {
                if (result[emotions[i]] > max) {
                    max=result[emotions[i]];
                }
            }
            var maxEmotion;
            for (var i = 0; i < emotions.length; i++) {
                if (result[emotions[i]] == max) {
                    maxEmotion = emotions[i];
                    break;
                }
            }
            res.json({"emotion":maxEmotion});
        })
        .catch(function(err) {
            res.send(err);
        });
    })
    .get(function(req, res) {
        res.send('Hello');
});

// router.route("/indicio")
//     .get(function(req, res) {   

//         // single example
//         indico.emotion("I did it. I got into Grad School. Not just any program, but a GREAT program. :-)")
//         .then(response)
//         .catch(logError);

//         // batch example
//         var batchInput = [
//             "I did it. I got into Grad School. Not just any program, but a GREAT program. :-)",
//             "Like seriously my life is bleak, I have been unemployed for almost a year."
//         ];
//         indico.emotion(batchInput)
//         .then(response)
//         .catch(logError);
        
//         res.send("done");
//     });

app.use("/", router);

//app.listen(5000);
//console.log("starting express server on port 9100...");
app.listen(app.get('port'), "127.0.0.1", function() {
    
  console.log('Node app is running on port', app.get('port'));

});
