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

data.colors.forEach(function(element) {
    // Create the Color options
});

data.engines.forEach(function(element) {
    // Create the Engine Options
});

data.wheels.forEach(function(element) {
    // Create the Wheel Options
});

data.otherFeatures.forEach(function(element) {
    // Create the other options
});

function updatePage() {
    // Create variable "price"
    // Add the price for each part on data.currentSegway
    // If data.currentSegway matches an object in data.preBuilts:
    //   price -= 300
    
    // Pull up the correct image

    // Create the option list for data.currentSegway

    // Update the price block
    // Update image
    // Update the option list
}

function setPrebuilt(name) {
    // Set data.currentSegawy to the named prebuilt
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
    // If data.currentSegway.option is false:
    //   Set data.currentSegway.option to true
    // Else
    //   Set data.currentSegway.option to false

    updatePrice();
}
