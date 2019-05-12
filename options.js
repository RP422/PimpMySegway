data = {
    "colors": [
        "Pink",
        "Green",
        "Blue",
        "Red",
        "Yellow"
    ],
    "wheels": [
        "Standard",
        "Off-road",
        "Monster"
    ],
    "engines": [
        "High Power",
        "High Speed",
        "Power Efficent"
    ],
    "otherFeatures": [
        "Sparkles",
        "Bag",
        "Headlight",
        "Fan",
        "HandlebarCovers",
        "Speakers",
        "Umbrella",
        "Thermometer"
    ],
    "preBuilts": {
        "Princess": {
            "color": "Pink",
            "engine": "Power Efficent",
            "wheel": "Standard",
            "sparkles":        true,
            "bag":             false,
            "headlight":       false,
            "fan":             false,
            "handlebarCovers": true,
            "speakers":        false,
            "umbrella":        false,
            "thermometer":     false
        },
        "Big Boi": {
            "color": "Green",
            "engine": "High Power",
            "wheel": "Monster",
            "sparkles":        false,
            "bag":             false,
            "headlight":       true,
            "fan":             false,
            "handlebarCovers": false,
            "speakers":        true,
            "umbrella":        false,
            "thermometer":     false
        },
        "Sad Lad": {
            "color": "Blue",
            "engine": "Power Efficent",
            "wheel": "Standard",
            "sparkles":        false,
            "bag":             false,
            "headlight":       false,
            "fan":             false,
            "handlebarCovers": false,
            "speakers":        false,
            "umbrella":        true,
            "thermometer":     true
        },
        "Lightning McQueen": {
            "color": "Red",
            "engine": "High Speed",
            "wheel": "Off-road",
            "sparkles":        false,
            "bag":             false,
            "headlight":       true,
            "fan":             true,
            "handlebarCovers": false,
            "speakers":        false,
            "umbrella":        false,
            "thermometer":     false
        },
        "Explorer": {
            "color": "Yellow",
            "engine": "High Power",
            "wheel": "Off-road",
            "sparkles":        false,
            "bag":             true,
            "headlight":       false,
            "fan":             false,
            "handlebarCovers": false,
            "speakers":        false,
            "umbrella":        true,
            "thermometer":     false
        }
    },
    "currentSegway": {
        "color": "Red",
        "engine": "Power Efficent",
        "wheel": "Standard",
        "sparkles":        false,
        "bag":             false,
        "headlight":       false,
        "fan":             false,
        "handlebarCovers": false,
        "speakers":        false,
        "umbrella":        false,
        "thermometer":     false
    },
};

// Containers to plop things in.
var colorContainer = document.getElementById("colors");
var engineContainer = document.getElementById("engines");
var wheelContainer = document.getElementById("wheel");
var engineContainer = document.getElementById("other");

data.colors.forEach(function(element) {
    var newElement = document.createElement("div");

    newElement.id = element;
    newElement.setAttribute("data-color", element);
    // Do stuff with the new element.

    colorContainer.appendChild(newElement);
});

data.engines.forEach(function(element) {
    var newElement = document.createElement("div");

    // Do stuff with the new element.

    engineContainer.appendChild(newElement);
});

data.wheels.forEach(function(element) {
    var newElement = document.createElement("div");

    // Do stuff with the new element.

    wheelContainer.appendChild(newElement);
});

data.otherFeatures.forEach(function(element) {
    var newElement = document.createElement("div");

    // Do stuff with the new element.

    otherContainer.appendChild(newElement);
});

function updatePage() {
    // Calculate price
    var price = 650.99;
    
    // If data.currentSegway matches an object in data.preBuilts:
    //   price -= 300

    document.getElementById("price").innerHTML = "$" + price;
    
    // Pull up the correct image
    imgSrc = "blahblahblah";
    document.getElementById("segwayPreview").src = imgSrc;

    // Create the option list for data.currentSegway
    var options = ["Thing 1", "Thing 2", "Thing 3"];
    options.forEach(function(opion) {
        // Append the string or something to the container 
        //   the options are in.
    });
}

// If we use the data attributes, we should be able to remove 
//   the parameters here and just get the data from the calling 
//   element.
function setPrebuilt(name) {
    // This should work, but needs testing of course.
    currentSegway = data.preBuilts[name];
    updatePage();
}

function updateColor(newColor) {
    data.currentSegway.color = newColor;
    updatePage();
}

function updateEngine(newEngine) {
    data.ccurrentSegway.engine = newEngine;
    updatePage();
}

function updateWheel(newWheel) {
    data.ccurrentSegway.wheel = newWheel;
    updatePage();
}

function updateOption(option) {
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
