let request = new XMLHttpRequest();

let current_segway = {
  "color": "",
  "engine": "",
  "wheel": "",
  "bag":                false,
  "fan":                false,
  "handlebar_covers":   false,
  "headlight":          false,
  "reflectors":         false,
  "side_mirrors":       false,
  "speaker":            false,
  "thermometer":        false
}

// Loads the json data
function loadData() {
    request.open('GET', 'scripts/data.json');
    request.onload = loadComplete;
    request.send();
}

function loadComplete(evt) {
    let json = JSON.parse(request.responseText);
}

// Containers to plop things in.
let colorContainer = document.getElementById("colors");
let engineContainer = document.getElementById("engines");
let wheelContainer = document.getElementById("wheel");
let otherContainer = document.getElementById("other");
let equippedOptions = "";
let totalPrice = 0;

const updatePage = () => {
    // TODO Replace this with the function to update the image.

    totalPrice = 0;

    equippedOptions = "<tr>" + currentSegway.engine + " engine</tr><tr>$" + json.prices[currentSegway.engine] + "</tr>";
    totalPrice += json.prices[currentSegway.engine];

    equippedOptions += "<tr>" + currentSegway.wheel + " wheels</tr><tr>$" + json.prices[currentSegway.wheel] + "</tr>";
    totalPrice += json.prices[currentSegway.wheel];
    
    equippedOptions += "<tr>" + currentSegway.color + " paint job</tr><tr>$" + json.prices[currentSegway.color] + "</tr>";
    totalPrice += json.prices[currentSegway.color];
    
    json.otherFeatures.forEach(function(option) {
        let optionButton = document.getElementById(option);

        if(currentSegway[option]) {
            optionButton.classList.add("active");

            equippedOptions += "<tr>" + option + "</tr><tr>$" + json.prices[option] + "</tr>";
            totalPrice += json.prices[option];
        }
        else {
            optionButton.classList.remove("active");
        }
    });

    if(matchesPrebuilt()) {
        equippedOptions += "<tr>Pre-Built Discount</tr><tr>-$300</tr>";
    }

    equippedOptions += "<tr>Total Price</tr><tr>$" + totalPrice + "</tr>";

    document.getElementById("equippedOptionsTable").innerHTML = equippedOptions;
}

const matchesPrebuilt = () => {
    match = false;

    json.preBuilts.forEach(function(prebuilt) {
        if(currentSegway == prebuilt) {
            match = true;
        }
    })

    return match;
}

const setPrebuilt = name => {
    // This should work, but needs testing of course.
    currentSegway = preBuilts[name];
    updatePage();
}

const updateColor = newColor => {
    currentSegway.color = newColor;
    updatePage();
}

const updateEngine = newEngine => {
    currentSegway.engine = newEngine;
    updatePage();
}

const updateWheel = newWheel => {
    currentSegway.wheel = newWheel;
    updatePage();
}

const updateOption = option => {
    // Same as with setPrebuilt(). This should work,
    //   but is untested.
    if(currentSegway[option] == false) {
        currentSegway[option] = true;
    }
    else {
        currentSegway[option] = false;
    }

    updatepage();
}

// TODO Figure out if these elements need anything inside them 
//   other than an ID.
const setupOptions = () => {
    json.colors.forEach(function(element) {
        let newElement = document.createElement("div");
    
        // Do stuff with the new element?
        newElement.id = element;
    
        colorContainer.appendChild(newElement);
    });
    
    json.engines.forEach(function(element) {
        let newElement = document.createElement("div");
    
        // Do stuff with the new element?
        newElement.id = element;
    
        engineContainer.appendChild(newElement);
    });
    
    json.wheels.forEach(function(element) {
        let newElement = document.createElement("div");
    
        // Do stuff with the new element?
        newElement.id = element;
    
        wheelContainer.appendChild(newElement);
    });
    
    json.otherFeatures.forEach(function(element) {
        let newElement = document.createElement("div");
    
        // Do stuff with the new element?
        newElement.id = element;
    
        otherContainer.appendChild(newElement);
    });

    updatePage();
}