console.log("Hello");

let preBuiltID = ["princess", "big_boi","sad_lad","lightning_mcqueen","explorer"]

function setEventListener(){
    preBuiltID.forEach((id) => {
        document.getElementById(id).addEventListener("click", function(){
            setPrebuilt();
        });
    })
}
setEventListener();