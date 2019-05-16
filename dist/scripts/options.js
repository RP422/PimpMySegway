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
let equippedOptions = "";
let totalPrice = 0;

const updatePage = () => {
    updateSegwayImage();

    equippedOptions = "<tr>" + data.current_segway.engine + " engine</tr><tr>$" + data.prices.engines[data.current_segway.engine] + "</tr>";
    totalPrice += data.prices.engines[data.current_segway.engine];

    equippedOptions += "<tr>" + current_segway.wheel + " wheels</tr><tr>$" + json.prices[current_segway.wheel] + "</tr>";
    totalPrice += json.prices[current_segway.wheel];
    
    equippedOptions += "<tr>" + current_segway.color + " paint job</tr><tr>$" + json.prices[current_segway.color] + "</tr>";
    totalPrice += json.prices[current_segway.color];
    
    json.otherFeatures.forEach(function(option) {
        let optionButton = document.getElementById(option);

        if(current_segway[option]) {
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

// This should work, but needs testing.
const matchesPrebuilt = () => {
    match = false;

    json.preBuilts.forEach(function(prebuilt) {
        if(current_segway == prebuilt) {
            match = true;
        }
    })

    return match;
}

// This should work, but needs testinge.
const setPrebuilt = name => {
    current_segway = preBuilts[name];
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
    options = document.createElement("div");
    options.id = "optionsArea";
    options.setAttribute("class", "box container flex-col");

    colorContainer  = document.createElement("div");
    colorContainer.id = "colorOptions";
    colorContainer.setAttribute("class", "box container flex-col options-size");

    tiresContainer = document.createElement("div");
    tiresContainer.id = "tiresOptions";
    tiresContainer.setAttribute("class", "box container flex-col options-size");

    engineContainer = document.createElement("div");
    engineContainer.id = "enginesOptions";
    engineContainer.setAttribute("class", "box container flex-col options-size");

    otherContainer = document.createElement("div");
    otherContainer.id = "otherOptions";
    otherContainer.setAttribute("class", "box container flex-col options-size");

    colorTitle = document.createElement("div");
    colorTitle.setAttribute("class", "box container flex-col optionTitle");
    colorTitle.innerHTML = "Colors:";
    colorContainer.appendChild(colorTitle);

    colorOptionsWrapper = document.createElement("div");
    colorOptionsWrapper.id = "colorOptionsWrapper";
    colorOptionsWrapper.setAttribute("class", "box container flex-col options-wrapper");

    json.colors.forEach(function(element) {
        label = document.createElement("label");
        label.setAttribute("class", "box container flex-row radio-container option-center")
        label.innerHTML = json.htmlValues.colors[element]

        checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.onclick = "ifChecked()";
        checkbox.value = element;

        span = document.createElement("span");
        span.setAttribute("class", "checkmark");

        label.appendChild(checkbox);
        label.appendChild(span);
        colorOptionsWrapper.appendChild(label);
    });
    colorContainer.appendChild(colorOptionsWrapper);
    
    wheelOptionsWrapper = document.createElement("div");
    wheelOptionsWrapper.id = "tiresOptionsWrapper";
    wheelOptionsWrapper.setAttribute("class", "box container flex-col options-wrapper");

    json.wheels.forEach(function(element) {
        label = document.createElement("label");
        label.setAttribute("class", "box container flex-row radio-container option-center")
        label.innerHTML = json.htmlValues.wheels[element]

        checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.onclick = "ifChecked()";
        checkbox.value = element;

        span = document.createElement("span");
        span.setAttribute("class", "checkmark");

        label.appendChild(checkbox);
        label.appendChild(span);
        wheelOptionsWrapper.appendChild(label);
    });
    tiresContainer.appendChild(wheelOptionsWrapper);

    engineOptionsWrapper = document.createElement("div");
    engineOptionsWrapper.id = "engineOptionsWrapper";
    engineOptionsWrapper.setAttribute("class", "box container flex-col options-wrapper");

    json.engines.forEach(function(element) {
        label = document.createElement("label");
        label.setAttribute("class", "box container flex-row radio-container option-center")
        label.innerHTML = json.htmlValues.engines[element]

        checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.onclick = "ifChecked()";
        checkbox.value = element;

        span = document.createElement("span");
        span.setAttribute("class", "checkmark");

        label.appendChild(checkbox);
        label.appendChild(span);
        engineOptionsWrapper.appendChild(label);
    });
    engineContainer.appendChild(engineOptionsWrapper);
    
    otherOptionsWrapper = document.createElement("div");
    otherOptionsWrapper.id = "otherOptionsWrapper";
    otherOptionsWrapper.setAttribute("class", "box container flex-col options-wrapper");

    json.otherFeatures.forEach(function(element) {
        label = document.createElement("label");
        label.setAttribute("class", "box container flex-row radio-container option-center")
        label.innerHTML = json.htmlValues.other[element]

        checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.onclick = "ifChecked()";
        checkbox.value = element;

        span = document.createElement("span");
        span.setAttribute("class", "checkmark");

        label.appendChild(checkbox);
        label.appendChild(span);
        otherOptionsWrapper.appendChild(label);
    });
    otherContainer.appendChild(otherOptionsWrapper);

    options.appendChild(colorcontainer);
    options.appendChild(tiresContainer);
    options.appendChild(engineContainer);
    options.appendChild(otherContainer);

    return options;
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
setupOptions();
