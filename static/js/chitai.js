var player = "chitai"

changeQuestion()

// Get the input field
var input = document.getElementById("answer");

// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("button").click();
    input.value = ""

  }
});

function answerQuestion(){
    let answer = document.getElementById("answer").value

    console.log(answer)
    var xhr = new XMLHttpRequest();
    var url = "https://chiberbd.appspot.com:8080/api/answerQuestion";
    xhr.open("post", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            console.log("answerResponse: "+ JSON.stringify(json))
            handleAnswerResponse(json)
            document.getElementById("answer").value = ""
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
    var url = "https://chiberbd.appspot.com:8080/api/getCurrentQuestion?player="+player;
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
    window.location.href='/end.html'
}