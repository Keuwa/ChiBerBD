var player = "chitai"

changeQuestion()

function answerQuestion(){
    let answer = document.getElementById("answer").value

    var xhr = new XMLHttpRequest();
    var url = "http://192.168.43.90:8080/api/answerQuestion";
    xhr.open("post", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            console.log("answerResponse: "+ json)
            handleAnswerResponse(json)
        }
    };
    let body = {
        "player":player,
        "answer":answer
    }
    xhr.send(body);
}

function handleAnswerResponse(result){
    if (result){
        alert("Bonne réponse")
        changeQuestion()
    } else {
        alert("Noob")
    }

}


function changeQuestion(){
    var xhr = new XMLHttpRequest();
    console.log("hey")
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