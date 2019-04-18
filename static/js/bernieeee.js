var player = "bernieeee"

changeQuestion()

function answerQuestion(){
    let answer = document.getElementById("answer").value

    console.log(answer)
    var xhr = new XMLHttpRequest();
    var url = "http://192.168.43.90:8080/api/answerQuestion";
    xhr.open("post", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            console.log("answerResponse: "+ JSON.stringify(json))
            handleAnswerResponse(json)
        }
    };
    let body = {
        "player":player,
        "answer":answer
    }
    xhr.send(JSON.stringify(body));
}

function handleAnswerResponse(result){
    if (result.over){
        handleEnd()
        return
    }

    if (result.result){
        alert("Bonne réponse")
        changeQuestion()
    } else {
        alert("Noob")
    }

}


function changeQuestion(){
    var xhr = new XMLHttpRequest();
    var url = "http://192.168.43.90:8080/api/getCurrentQuestion?player="+player;
    xhr.open("get", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = xhr.responseText
            document.getElementById("question").innerHTML = json
        }
    };
    xhr.send();
}

function handleEnd(){
    console.log("end");
    
}