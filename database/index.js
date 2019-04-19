var levelup = require('levelup')
var leveldown = require('leveldown')

var timeTotal = 10

function setWinner(player){
    console.log("helloaze");
    console.log(player)
    
    db.put(player+"End", Date.now(),function(err,value){
        if (err) res.send(err)
    })
}

module.exports = {
    initDb: (res)=> {
        var dateNow = Date.now()
        
        var db = levelup(leveldown('./mydb'))
        
        setTimeout(function(){ 
            db.del("timer", function (err) {
                if (err) res.send({"err11":err.toString()})
            })
            db.del("chitaiRep", function (err) {
                if (err) res.send({"err12":err.toString()})
            })
            db.del("bernieeeeRep", function (err) {
                if (err) res.send({"err13":err.toString()})
            })
            db.del("chitaiEnd", function (err) {
                if (err) res.send({"err14":err.toString()})
            })
            db.del("bernieeeeEnd", function (err) {
                if (err) res.send({"err15":err.toString()})
            })
            db.del("bernieeeeQuestion", function (err) {
                if (err) res.send({"err16":err.toString()})
            })
            db.del("chitaiQuestion", function (err) {
                if (err) res.send({"err17":err.toString()})
            })
    
            db.put("timer",dateNow, function (err) {
                if (err) res.send({"err18":err.toString()})
            })
    
            db.put('chitaiRep', 0, function (err) {
                if (err) res.send({"err2":err.toString()})
            })
    
            db.put('bernieeeeRep',0 , function (err) {
                if (err) res.send({"err2":err.toString()})
            })
    
            let chitaiQuestion = {
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
    
            let bernieeeeQuestion = {
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
    
            db.put('bernieeeeQuestion',JSON.stringify(bernieeeeQuestion) , function (err) {
                if (err) res.send({"err4":err.toString()})
            })
    
            db.put('chitaiQuestion',JSON.stringify(chitaiQuestion) , function (err) {
                if (err) res.send({"err5":err.toString()})
            })
    
            // TODO add 0 in timer for thoses bitches then make the winerFunction
            db.put('chitaiEnd',99999999999999 , function (err) {
                if (err) res.send({"err6":err.toString()})
            })
    
            db.put('bernieeeeEnd',99999999999999, function (err) {
                if (err) res.send({"err7":err.toString()})
                res.send("ok")
            })
        }, 3000);
    },

    answerQuestion: (player,answer,res)=> {      
        db.get(player + "Rep", function (err, questionIndex) {
            if (err) res.send(err)
            
            db.get(player + "Question", function(err, value){
                if (err) res.send(err)
                
                result = value.toString()
                result = JSON.parse(result)
                
                console.log(`Answer: ${answer} - RealAnswer:${result.answers[parseInt(questionIndex)]}`);

                if(result.answers.length - 1 == parseInt(questionIndex)){
                    res.send({
                        "result":true,
                        "over":true
                    })
                    setWinner(player)

                    return
                }

                if (result.answers[parseInt(questionIndex)] === answer.toLowerCase()){
                    db.put(player+"Rep", parseInt(questionIndex) + 1, function(err){
                        if (err) res.send(err)
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
            })
          })
    },
    
    getCurrentQuestion: (player,res)=> {        
        db.get(player + "Rep", function (err, currentQuestion) {
            if (err) res.send(err) // likely the key was not found

            db.get(player+"Question",function (err,value){
                if (err) res.send(err)
                result = value.toString()
                result = JSON.parse(result)
                
                res.send(result.questions[parseInt(currentQuestion)])
            })
          })
    },

    getSecondLeft: (res)=> {
        db.get("timer")
        .then(function(value){
            let timer = parseInt(value.toString())
            let date = Date.now()
            let dateTimer = new Date(timer + (60000 * timeTotal))
            if (dateTimer - date > 0){
                res.send({"timer":dateTimer - date})
            } else{
                res.send({"timer":0})
            }
        })
        .catch((err)=>{
            res.send(err)
        })
    },
    getWinner: (res)=> {
        console.log("hello");
        
        db.get("chitaiEnd")
        .then(function(chitaiEnd){
            db.get("bernieeeeEnd")
            .then(function(bernieeeeEnd){
                console.log(bernieeeeEnd.toString());
                console.log(parseInt(chitaiEnd));
                
                var result = {
                    "bernieeee":bernieeeeEnd == null ? 0 : parseInt(bernieeeeEnd),
                    "chitai":chitaiEnd == null ? 0 : parseInt(chitaiEnd)
                }
                res.send(JSON.stringify(result))
            })
        })
    },
}


