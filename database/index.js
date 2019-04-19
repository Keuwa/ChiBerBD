var levelup = require('levelup')
var leveldown = require('leveldown')
var fs = require("fs")
var path = require('path')

var filePath = path.join(__dirname, 'database.json');


var timeTotal = 10

var db = levelup(leveldown('./mydb'))

function setWinner(player){
    fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
        if (!err) {
            data = JSON.parse(data)
            data[player].end = Date.now()
            fs.writeFile(filePath,JSON.stringify(data),(err)=>{
                if (err) console.log(err)
                
            })
        } else {
            console.log(err)
        }
    }); 
    
}

module.exports = {
    initDb: (res)=> {
        var dateNow = Date.now()
        var data = {
            "timer":dateNow,
            "bernieeee":{
                "end":99999999999999999999999,
                "rep":0,
                "question":{
                    "questions":[
                        "Et donc sur",
                        "La go la c'est peut etre une fille bien. Mais que preferons nous ?",
                        "Vague, pierre, fantome, loing",
                        "A l'ultimate, on cherche à l'éviter à tout prix. Mais dans un RPG c'est souvent une bonne nouvelle",
                        "Cette chanson est vraiment la plus dure de toute... Je n'arrive même pas les 3 premières couleurs...",
                        "<p id=\"song\" > Oh shit soraka i'm gonna die !! p> 235s"
                    ],
                    "answers":[
                        "hoth",
                        "tchoin",
                        "tsunami",
                        "drop",
                        "rouge vert jaune",
                        "mocking shout"
                    ]
                }
            },
            "chitai":{
                "end":99999999999999999999999,
                "rep":0,
                "question": {
                    "questions":[
                        "À abaisser en cas d'urgence. Mais n'arretera pas la légion",
                        "Si A ne dis pas bonjour a B. Quel membre de la famille de A doit être niquer",
                        "Quand tu cherches, il n'y a qu'une chose \"HERE\"",
                        "J'ai trouvé un document entre deux salles de test. Il était écrit \"Genetic Lifeform and Disk Operating System\". Je ne sais pas ce que ça veut dire mais j'attends toujours mon gateau",
                        "Agent de la division par deux, bienvenu à la maison blanche nous avons besoin de sécuriser la safe room dans la zone au sud de notre position.<br> J'espère pour vous que vous n'avez pas perdu votre carte",
                        "[FR]Survivant avec un invité mystherbe ! - 1:27:17"
                    ],
                    "answers":[
                        "palette",
                        "mère",
                        "mozambique",
                        "glados",
                        "safe house",
                        "smirk"
                    ]
                }
            }
        }
        fs.writeFile(filePath,JSON.stringify(data),(err)=>{
            if (err) res.send(err)
            
            res.send("ok")
        })
    },

    answerQuestion: (player,answer,res)=> {  
        fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
            if (!err) {
                data = JSON.parse(data)

                if(data[player].question.answers.length - 1 == data[player].rep) {
                    res.send({
                        "result":true,
                        "over":true
                    })
                    setWinner(player)

                    return
                }

                if (data[player].question.answers[data[player].rep] === answer.toLowerCase()){
                    data[player].rep = data[player].rep + 1
                    fs.writeFile(filePath,JSON.stringify(data),(err)=>{
                        if (err) console.log(err)
                        res.send({
                            "result":true,
                            "over":false
                        })
                    })
                    return
                }

                res.send({
                    "result":false,
                    "over":false
                })

                
            } else {
                console.log(err)
            }
        }); 
    },
    
    getCurrentQuestion: (player,res)=> {        
        filePath = path.join(__dirname, 'database.json');
        fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
            if (!err) {
                data = JSON.parse(data)
                console.log(data[player].question.questions[data[player].rep]);

                res.send(data[player].question.questions[data[player].rep])
            } else {
                res.send({"err":err})
            }
        }); 
    },

    getSecondLeft: (res)=> {
        filePath = path.join(__dirname, 'database.json');
        fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
            if (!err) {
                data = JSON.parse(data)
                let timer = data.timer
                let date = Date.now()
                let dateTimer = new Date(timer + (60000 * timeTotal))
                if (dateTimer - date > 0){
                    res.send({"timer":dateTimer - date})
                } else{
                    res.send({"timer":0})
                }
            } else {
                res.send({"err":err})
            }
        }); 
    },
    getWinner: (res)=> {
        filePath = path.join(__dirname, 'database.json');
        fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
            if (!err) {
                data = JSON.parse(data)
                var result = {
                    "bernieeee":data.bernieeee.end,
                    "chitai":data.chitai.end,
                }
                res.send(JSON.stringify(result))
            } else {
                res.send({"err":err})
            }
        }); 
    },
}


