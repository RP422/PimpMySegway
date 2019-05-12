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
            "Sparkles":        true,
            "Bag":             false,
            "Headlight":       false,
            "Fan":             false,
            "HandlebarCovers": true,
            "Speakers":        false,
            "Umbrella":        false,
            "Thermometer":     false
        },
        "Big Boi": {
            "color": "Green",
            "engine": "High Power",
            "wheel": "Monster",
            "Sparkles":        false,
            "Bag":             false,
            "Headlight":       true,
            "Fan":             false,
            "HandlebarCovers": false,
            "Speakers":        true,
            "Umbrella":        false,
            "Thermometer":     false
        },
        "Sad Lad": {
            "color": "Blue",
            "engine": "Power Efficent",
            "wheel": "Standard",
            "Sparkles":        false,
            "Bag":             false,
            "Headlight":       false,
            "Fan":             false,
            "HandlebarCovers": false,
            "Speakers":        false,
            "Umbrella":        true,
            "Thermometer":     true
        },
        "Lightning McQueen": {
            "color": "Red",
            "engine": "High Speed",
            "wheel": "Off-road",
            "Sparkles":        false,
            "Bag":             false,
            "Headlight":       true,
            "Fan":             true,
            "HandlebarCovers": false,
            "Speakers":        false,
            "Umbrella":        false,
            "Thermometer":     false
        },
        "Explorer": {
            "color": "Yellow",
            "engine": "High Power",
            "wheel": "Off-road",
            "Sparkles":        false,
            "Bag":             true,
            "Headlight":       false,
            "Fan":             false,
            "HandlebarCovers": false,
            "Speakers":        false,
            "Umbrella":        true,
            "Thermometer":     false
        }
    },
    "currentSegway": {
        "color": "Red",
        "engine": "Power Efficent",
        "wheel": "Standard",
        "Sparkles":        false,
        "Bag":             false,
        "Headlight":       false,
        "Fan":             false,
        "HandlebarCovers": false,
        "Speakers":        false,
        "Umbrella":        false,
        "Thermometer":     false
    },
};

// Containers to plop things in.
var colorContainer = document.getElementById("colors");
var engineContainer = document.getElementById("engines");
var wheelContainer = document.getElementById("wheel");
var engineContainer = document.getElementById("other");

function updatePage() {
    // Tally the price for every equipped part
    var price = 650.99;
    
    // If data.currentSegway matches an object in data.preBuilts:
    //   price -= 300

    document.getElementById("price").innerHTML = "$" + price;
    
    // Pull up the correct image
    imgSrc = "blahblahblah";
    document.getElementById("segwayPreview").src = imgSrc;

    var equippedOptions = data.currentSegway.engine + " engine";
    equippedOptions += "<br />" + data.currentSegway.wheel + " wheels";
    equippedOptions += "<br />" + data.currentSegway.color + " paint job";

    // Create the option list for data.currentSegway
    data.otherFeatures.forEach(function(option) {
        equippedOptions += "<br />" + option;
    });

    document.getElementById("equippedOptionsList").innerHTML = equippedOptions;
    
    // Do something with the other option buttons to show 
    //  they're turned on or not?
}

// If we use the data attributes, we should be able to remove 
//   the parameter here and just get the data from the calling 
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

function setupOptions() {
    
    data.colors.forEach(function(element) {
        var newElement = document.createElement("div");
    
        // Do stuff with the new element?
        newElement.id = element;
    
        colorContainer.appendChild(newElement);
    });
    
    data.engines.forEach(function(element) {
        var newElement = document.createElement("div");
    
        // Do stuff with the new element?
        newElement.id = element;
    
        engineContainer.appendChild(newElement);
    });
    
    data.wheels.forEach(function(element) {
        var newElement = document.createElement("div");
    
        // Do stuff with the new element?
        newElement.id = element;
    
        wheelContainer.appendChild(newElement);
    });
    
    data.otherFeatures.forEach(function(element) {
        var newElement = document.createElement("div");
    
        // Do stuff with the new element?
        newElement.id = element;
    
        otherContainer.appendChild(newElement);
    });

    updatePage();
}