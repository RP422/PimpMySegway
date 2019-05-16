let preBuiltID = ["princess", "big_boi","sad_lad","lightning_mcqueen","explorer"]

function setPrebuildEventListener(){
    preBuiltID.forEach((id) => {
        document.getElementById(id).addEventListener("click", function(){
            setPrebuilt(id);
        });
    })
}
document.getElementById("startButtonWrapper").onclick = function () {
    location.href = "http://localhost:3000/demo.html";
};

function replace(){
    document.getElementById("buttonArea").onclick = function () {
        location.href = "http://localhost:3000/thankyou.html";
    };
}

function redirect(){
    document.getElementById("finalButtonWrapper").onclick = function () {
        location.href = "http://localhost:3000/welcome.html";
    };    
}

setPrebuildEventListener();