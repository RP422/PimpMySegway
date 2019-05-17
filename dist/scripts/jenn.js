let preBuiltID = ["princess", "big_boi","sad_lad","lightning_mcqueen","explorer"]

function setPrebuildEventListener(){
    preBuiltID.forEach((id) => {
        document.getElementById(id).addEventListener("click", function(){
            setPrebuilt(id);
        });
    })
}
function replace(){
    document.getElementById("buttonArea").onclick = function () {
        location.href = "http://localhost:3000/thankyou.html";
    };
}
setPrebuildEventListener();