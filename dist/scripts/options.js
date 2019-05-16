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
    setDefaultSegway(json);
    updateSegwayImage();
}

const loadComplete = evt => {
    let json = JSON.parse(request.responseText);
}

const setDefaultSegway = j => {
    for (let index in j.default_segway) {
        for (let i in current_segway) {
        current_segway[i] = j.default_segway[i];
        }
    }
}
  
const updateSegwayImage = () => {
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

    // equippedOptions += "<tr>Total Price</tr><tr>$" + totalPrice + "</tr>";

    // document.getElementById("equippedOptionsTable").innerHTML = equippedOptions;
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

const ifChecked = () => {
    let colorOptions = document.getElementById('colorOptionsWrapper').getElementsByTagName('input')
    for (let i in colorOptions) {
        if (colorOptions[i].checked == true) {
            current_segway.color = colorOptions[i].value;
        }
    }
    let tiresOptions = document.getElementById('tiresOptionsWrapper').getElementsByTagName('input')
    for (let i in tiresOptions) {
        if (tiresOptions[i].checked == true) {
            current_segway.wheel = tiresOptions[i].value;
        }
    }
    let enginesOptions = document.getElementById('enginesOptionsWrapper').getElementsByTagName('input')
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
