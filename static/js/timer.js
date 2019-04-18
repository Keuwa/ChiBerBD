initTimer()

function initTimer(){
    var xhr = new XMLHttpRequest();
    var url = "https://chiberbd.appspot.com:8080/api/getSecondLeft";
    xhr.open("get", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            var date = new Date(json.timer);
            var timeString = date.toISOString().substr(14, 5);
            console.log(timeString)
            updateTimer(date)
        }
    };
    xhr.send();
}

function updateTimer(date){
    let interval = setInterval(() => { 
        date = new Date(date - 500)
        if (date < 0){
            console.log("over")
            clearInterval(interval)
            return
        }
        let span = document.getElementById("timer")
        span.innerHTML = date.toISOString().substr(14, 5);
    }, 500);
}