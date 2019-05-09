let preBuiltID = ["pre1", "pre2","pre3","pre4","pre5"]
document.getElementById("pre1").addEventListener("click", PreBuildClick());

function setEventListener(){
   preBuiltID.forEach((e) => {
       console.log(e);
   })
}
//function PreBuildClick() {
    //document.getElementById("pre1").innerHTML = "YOU CLICKED ME!";
//}
setEventListener();