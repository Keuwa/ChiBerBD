const database = require("../database")

const chitaiQuestion = []
const chitaiAnswer = []

const bernieeeeQuestion = []
const bernieeeeAnswer = []


module.exports = {
    init: (res) => {
        database.initDb(res)
    },
    getSecondLeft: (res)=>{
        database.getSecondLeft(res)
    },
    answerQuestion: (player,answer,res) => {
        database.answerQuestion(player,answer,res)
    },
    getScoring: () => {
        console.log("getScoring")
    },
    getCurrentQuestion: (player,res)=> {
        database.getCurrentQuestion(player,res)
    },
    getWinner: (res)=> {
        database.getWinner(res)
    }
}