const setupThankyou = () =>{
    let thankYouContainerDiv = document.createElement("div");
    thankYouContainerDiv.id = "finalContainer";
    thankYouContainerDiv.setAttribute("class", "container");

    let flexContainerDiv = document.createElement("div");
    flexContainerDiv.setAttribute("class", "box container flex-col");

    let finalTitleContainerDiv = document.createElement("div");
    finalTitleContainerDiv.id = "finalTitleContainer";
    finalTitleContainerDiv.setAttribute("class", "box container flex-col");
    finalTitleContainerDiv.textContent = `Thank you for your order!`

    let finalWrapperContainerDiv = document.createElement("div");
    finalWrapperContainerDiv.id = "finalButtonWrapper";
    finalWrapperContainerDiv.setAttribute("class", "box container flex-col");

    let finalButtonContainerDiv = document.createElement("button");
    finalButtonContainerDiv.setAttribute("class", "button startButton");
    finalButtonContainerDiv.setAttribute("onclick", "redirect();");
    finalButtonContainerDiv.textContent = `Home`

    finalWrapperContainerDiv.appendChild(finalButtonContainerDiv);
    flexContainerDiv.appendChild(finalTitleContainerDiv);
    flexContainerDiv.appendChild(finalWrapperContainerDiv);
    thankYouContainerDiv.appendChild(flexContainerDiv);
    document.body.appendChild(thankYouContainerDiv);
}

function redirect(){
    document.getElementById("finalButtonWrapper").onclick = function () {
        location.href = "http://localhost:3000";
    };    
}

setupThankyou();
