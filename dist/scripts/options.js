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
const loadData = () => {
    request.open('GET', 'scripts/data.json');
    request.onload = loadComplete;
    request.send();
}

const loadComplete = evt => {
    let json = JSON.parse(request.responseText);
    setDefaultSegway(json);
    updateSegwayImage();
    defaultChecked();
}

const setDefaultSegway = j => {
    console.log("setting default segway...");
    for (let index in j.default_segway) {
        for (let i in current_segway) {
        current_segway[i] = j.default_segway[i];
        }
    }
}
  
const updateSegwayImage = () => {
    console.log("updating segway image...");    
    let segwayStyle = document.getElementById("segwayImages").style;
    let urlString = "";
    for (let i in current_segway) {
        let opt = current_segway[i];
        if (opt == true) {
            urlString += `url(../images/new_images/${i}.png), `;
        }
    }
    urlString += `url(../images/new_images/${current_segway.engine}.png), url(../images/new_images/${current_segway.color}.png), url(../images/new_images/${current_segway.wheel}.png)`;
    console.log(urlString);
    segwayStyle.background = urlString;
    segwayStyle.backgroundPosition = "center";
    segwayStyle.backgroundRepeat = "no-repeat";
    segwayStyle.backgroundSize = "contain";
}

const defaultChecked = () => {
    for (let i in current_segway) {
        let opt = current_segway[i];
        if (opt == true) {
            let otherOptions = document.getElementById('otherOptionsWrapper').getElementsByTagName('input');
            for (let option in otherOptions) {
                if(otherOptions[option].value == i) {
                    otherOptions[option].checked = true;
                }
            } 
        }
    }
    let colorOptions = document.getElementById('colorOptionsWrapper').getElementsByTagName('input');
    for (let option in colorOptions) {
        if (colorOptions[option].value == current_segway.color) {
            colorOptions[option].checked = true;
        }
    }
    let engineOptions = document.getElementById('enginesOptionsWrapper').getElementsByTagName('input');
    for (let option in engineOptions) {
        if (engineOptions[option].value == current_segway.engine) {
            engineOptions[option].checked = true;
        }
    }
    let tireOptions = document.getElementById('tiresOptionsWrapper').getElementsByTagName('input');
    for (let option in tireOptions) {
        if (tireOptions[option].value == current_segway.wheel) {
            tireOptions[option].checked = true;
        }
    }
}

// Containers to plop things in.
let colorContainer = document.getElementById("colors");
let engineContainer = document.getElementById("engines");
let wheelContainer = document.getElementById("wheel");
let otherContainer = document.getElementById("other");
let equippedOptions = "";
let totalPrice = 0;

const updatePage = () => {
    updateSegwayImage();
    //updatePrice();

    // if(matchesPrebuilt()) {
    //     equippedOptions += "<tr>Pre-Built Discount</tr><tr>-$300</tr>";
    // }

    equippedOptions = "<tr>" + data.currentSegway.engine + " engine</tr><tr>$" + data.prices.engines[data.currentSegway.engine] + "</tr>";
    totalPrice += data.prices.engines[data.currentSegway.engine];

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
        totalPrice -= 300;
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

const updateOption = option => {
    if (current_segway[option] == false) {
        current_segway[option] = true;
    }
    else {
        current_segway[option] = false;
    }  
    
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

const ifChecked = () => {
    let colorOptions = document.getElementById('colorOptionsWrapper').getElementsByTagName('input');
    for (let i in colorOptions) {
        if (colorOptions[i].checked == true) {
            current_segway.color = colorOptions[i].value;
        }
    }
    let tiresOptions = document.getElementById('tiresOptionsWrapper').getElementsByTagName('input');
    for (let i in tiresOptions) {
        if (tiresOptions[i].checked == true) {
            current_segway.wheel = tiresOptions[i].value;
        }
    }
    let enginesOptions = document.getElementById('enginesOptionsWrapper').getElementsByTagName('input');
    for (let i in enginesOptions) {
        if (enginesOptions[i].checked == true) {
            console.log(enginesOptions[i].value);
            current_segway.engine = enginesOptions[i].value;
        }
    }
    let otherOptions = document.getElementById('otherOptionsWrapper').getElementsByTagName('input');
    for (let i in otherOptions) {
        if (otherOptions[i].checked == true && current_segway[otherOptions[i].value] == false) {
            updateOption(otherOptions[i].value);
        }
        if (otherOptions[i].checked == false && current_segway[otherOptions[i].value] == true) {
            updateOption(otherOptions[i].value);
        }
    }
    updatePage();
}

loadData();
