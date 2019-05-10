console.log("Hello");

let preBuiltID = ["pre1", "pre2","pre3","pre4","pre5"]

function setEventListener(){
   preBuiltID.forEach((id) => {
       document.getElementById(id).addEventListener("click", PreBuildClick(id));
   })
}
function PreBuildClick(name) {
    document.getElementById("pre1").innerHTML = "YOU CLICKED ME!";
}
setEventListener();