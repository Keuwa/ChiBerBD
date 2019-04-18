'use strict';

// [START gae_node_request_example]
const express = require('express');
const app = express();
var bodyParser = require('body-parser')

const services = require("./server")


app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
 });
//db



//


app.use(express.static('static'))
app.use(bodyParser.json());

app.get("/api/init",function(req, res){
    services.init(res)
})

app.get("/api/getSecondLeft",function(req, res){
    services.getSecondLeft(res)
})

app.get("/api/winner",function(req, res){
    services.getWinner(res)
})

app.get("/api/getScoring",function(req, res){
    services.getScoring(res)
})

app.get("/api/getCurrentQuestion",function(req, res){
    console.log(req.query.player);
    
    services.getCurrentQuestion(req.query.player,res)
})

app.post("/api/answerQuestion",function(req, res){
    services.answerQuestion(req.body.player,req.body.answer,res)
})



// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});