let preBuiltID = ["princess", "big_boi","sad_lad","lightning_mcqueen","explorer"]

function setPrebuildEventListener(){
    preBuiltID.forEach((id) => {
        document.getElementById(id).addEventListener("click", function(){
            setPrebuilt(id);
        });
    })
}
setPrebuildEventListener();