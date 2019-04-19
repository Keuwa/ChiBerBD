var xhr = new XMLHttpRequest();
var url = "https://chiberbd.appspot.com/api/winner"
xhr.open("get", url, true);
xhr.setRequestHeader("Content-Type", "application/json");
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        var json = JSON.parse(xhr.responseText)
        var winner = "cheater"
        winner = (json.bernieeee > json.chitai) ? "Chitai" : "Bernieeee"
        console.log(JSON.stringify(json));
        
        document.getElementById("winner").innerHTML = JSON.stringify(winner)
    }
};
xhr.send();