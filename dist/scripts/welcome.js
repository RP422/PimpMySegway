const setupWelcome = () =>{
    let welcomeContainerDiv = document.createElement("div");
    welcomeContainerDiv.id = "startContainer";
    welcomeContainerDiv.setAttribute("class", "container");

    let boxContainerDiv = document.createElement("div");
    boxContainerDiv.setAttribute("class", "box container flex-col");

    let titleContainerDiv = document.createElement("div");
    titleContainerDiv.id = "titleContainer";
    titleContainerDiv.setAttribute("class", "box container flex-col");
    titleContainerDiv.textContent = `Welcome!`

    let wrapperContainerDiv = document.createElement("div");
    wrapperContainerDiv.id = "startButtonWrapper";
    wrapperContainerDiv.setAttribute("class", "box container flex-col");

    let buttonContainerDiv = document.createElement("button");
    buttonContainerDiv.setAttribute("class", "button startButton");
    buttonContainerDiv.setAttribute("onclick", "MoveOn();");
    buttonContainerDiv.textContent = `Build!`

    boxContainerDiv.appendChild(titleContainerDiv);
    boxContainerDiv.appendChild(wrapperContainerDiv);
    wrapperContainerDiv.appendChild(buttonContainerDiv);
    welcomeContainerDiv.appendChild(boxContainerDiv);
    document.body.appendChild(welcomeContainerDiv);

}
function MoveOn(){
    document.getElementById("startButtonWrapper").onclick = function () {
        location.href = "http://localhost:3000/demo.html";
    };    
}

setupWelcome();