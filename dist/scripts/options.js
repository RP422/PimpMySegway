// TODO Remove this and replace it with a json load
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
let colorContainer = document.getElementById("colors");
let engineContainer = document.getElementById("engines");
let wheelContainer = document.getElementById("wheel");
let engineContainer = document.getElementById("other");
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

    // if currentSegway matches a pre-built segway
    //   equippedOptions += "<tr>Pre-Built Discount</tr><tr>-$300</tr>";

    equippedOptions += "<tr>Total Price</tr><tr>$" + totalPrice + "</tr>";

    document.getElementById("equippedOptionsTable").innerHTML = equippedOptions;
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
    data.ccurrentSegway.engine = newEngine;
    updatePage();
}

const updateWheel = newWheel => {
    data.ccurrentSegway.wheel = newWheel;
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