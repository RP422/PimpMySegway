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

    equippedOptions = "<tr>" + data.currentSegway.engine + " engine</tr><tr>$" + data.prices.engines[data.currentSegway.engine] + "</tr>";
    totalPrice += data.prices.engines[data.currentSegway.engine];

    equippedOptions += "<tr>" + data.currentSegway.wheel + " wheels</tr><tr>$" + data.prices.wheels[data.currentSegway.wheel] + "</tr>";
    totalPrice += data.prices.wheels[data.currentSegway.wheel];
    
    equippedOptions += "<tr>" + data.currentSegway.color + " paint job</tr><tr>$" + data.prices.colors[data.currentSegway.color] + "</tr>";
    totalPrice += data.prices.colors[data.currentSegway.color];
    
    data.otherFeatures.forEach(function(option) {
        let optionButton = document.getElementById(option);

        if(currentSegway[option]) {
            optionButton.classList.add("active");

            equippedOptions += "<tr>" + option + "</tr><tr>$" + data.prices.options[option] + "</tr>";
            totalPrice += data.prices.options[option];
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

    data.preBuilts.forEach(function(prebuilt) {
        if(data.currentSegway == prebuilt) {
            match = true;
        }
    })

    return match;
}

const setPrebuilt = name => {
    // This should work, but needs testing of course.
    currentSegway = data.preBuilts[name];
    updatePage();
}

const updateColor = newColor => {
    data.currentSegway.color = newColor;
    updatePage();
}

const updateEngine = newEngine => {
    data.currentSegway.engine = newEngine;
    updatePage();
}

const updateWheel = newWheel => {
    data.currentSegway.wheel = newWheel;
    updatePage();
}

const updateOption = option => {
    // Same as with setPrebuilt(). This should work,
    //   but is untested.
    if(data.currentSegway[option] == false) {
        data.currentSegway[option] = true;
    }
    else {
        data.currentSegway[option] = false;
    }

    updatePrice();
}

// TODO Figure out if these elements need anything inside them 
//   other than an ID.
const setupOptions = () => {
    data.colors.forEach(function(element) {
        let newElement = document.createElement("div");
    
        // Do stuff with the new element?
        newElement.id = element;
    
        colorContainer.appendChild(newElement);
    });
    
    data.engines.forEach(function(element) {
        let newElement = document.createElement("div");
    
        // Do stuff with the new element?
        newElement.id = element;
    
        engineContainer.appendChild(newElement);
    });
    
    data.wheels.forEach(function(element) {
        let newElement = document.createElement("div");
    
        // Do stuff with the new element?
        newElement.id = element;
    
        wheelContainer.appendChild(newElement);
    });
    
    data.otherFeatures.forEach(function(element) {
        let newElement = document.createElement("div");
    
        // Do stuff with the new element?
        newElement.id = element;
    
        otherContainer.appendChild(newElement);
    });

    updatePage();
}