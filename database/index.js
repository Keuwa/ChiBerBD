var levelup = require('levelup')
var leveldown = require('leveldown')
var db = levelup(leveldown('./mydb'))

var timeTotal = 7

setWinner:(player)=>{
    db.put(player+"End",Date.now(),function(err,value){
        if (err) return console.log('anwser 1 Ooops!', err)
    })
}

module.exports = {
    initDb: (res)=> {
        var dateNow = Date.now()
        
        db.del("timer")
        db.del("chitaiRep")
        db.del("bernieeeeRep")

        db.put("timer",dateNow, function (err) {
            if (err) return console.log('init 1 Ooops!', err)
        })

        db.put('chitaiRep', 0, function (err) {
            if (err) return console.log('Init 2 Ooops!', err)
        })

        db.put('bernieeeeRep',0 , function (err) {
            if (err) return console.log('Init 3 Ooops!', err)
        })

        let chitaiQuestion = {
            "questions":[
                "A abaisser en cas d'urgence. Mais n'arretera pas la légion",
                "Si A ne dis pas bonjour a B. Quel membre de la famille de A doit être niquer",
                "Quand tu as besoin, il n'y a qu'une chose \"HERE\"",
                "J'ai trouvé un document entre deux salles de test. Il était écrit \"Genetic Lifeform and Disk Operating System\". Je ne sais pas ce que ça veut dire mais j'attends toujours mon gateau",
                "Agent de la division par deux, bienvenu à la maison blanche nous avons besoin de sécuriser la safe room dans la zone au sud de notre position.<br> J'espère pour vous que vous n'avez pas perdu votre carte",
                "[FR]Survivant avec un invité mystherbe ! - 1:27:17"
            ],
            "answers":[
                "palette",
                "mere",
                "mozambique",
                "safe house",
                "smirk"
            ]
        }

        let bernieeeeQuestion = {
            "questions":[
                "Et donc sur",
                "La go la c'est ptetre une fille bien. Mais que preferons nous ?",
                "Vague, pierre, fantome, loing",
                "A l'ultimate, on cherche à l'éviter à tout prix. Mais dans un RPG c'est souvent une bonne nouvelle",
                "Cette chanson est vraiment beaucoup trop dure... Je n'arrive même pas les 3 premières couleurs...",
                "<p id=\"song\" > Oh shit soraka i'm gonna die, league of ...<p> 235s"
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
            if (err) return console.log('Init 3 Ooops!', err)
        })

        db.put('chitaiQuestion',JSON.stringify(chitaiQuestion) , function (err) {
            if (err) return console.log('Init 3 Ooops!', err)
            res.send("ok")
        })


    },

    answerQuestion: (player,answer,res)=> {      
        db.get(player + "Rep", function (err, questionIndex) {
            if (err) return console.log('Error getting player !', err)
            
            db.get(player + "Question", function(err, value){
                if (err) return console.log('anwser 1 Ooops!', err)
                
                result = value.toString()
                result = JSON.parse(result)
                
                console.log(`Total: ${result.answers.length - 1} - index:${parseInt(questionIndex)}`);

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
                        if (err) return console.log('anwser 1 Ooops!', err)
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
            if (err) return console.log('Ooops!', err) // likely the key was not found

            db.get(player+"Question",function (err,value){
                if (err) return console.log('anwser 1 Ooops!', err)
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
}

