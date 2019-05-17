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

    container = document.getElementById("mainContainer");
    container.appendChild(setupPreBuilt(json));
    container.appendChild(setupSegway());
    container.appendChild(setupOptions(json));

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
            urlString += `url(../images/options/${i}.png), `;
        }
    }
    urlString += `url(../images/engines/${current_segway.engine}.png), url(../images/colors/${current_segway.color}.png), url(../images/tires/${current_segway.wheel}.png)`;
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

// This should work, but needs testing.
const setPrebuilt = name => {
    current_segway = preBuilts[name];    updatePage();
}

const updateOption = option => {
    if (current_segway[option] == false) {
        current_segway[option] = true;
    }
    else {
        current_segway[option] = false;
    }  
    
}

const setupOptions = (json) => {
    optionsContainer = document.createElement("div");
    optionsContainer.id = "optionsContainer";
    optionsContainer.setAttribute("class", "box container flex-col");

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
        checkbox.type = "radio";
        checkbox.name = "color";
        checkbox.setAttribute("onclick", "ifChecked()");
        checkbox.value = element;

        span = document.createElement("span");
        span.setAttribute("class", "checkmark");

        label.appendChild(checkbox);
        label.appendChild(span);
        colorOptionsWrapper.appendChild(label);

        price = document.createElement("div");
        price.setAttribute("class", "box optionPrices option-center");
        price.innerHTML = "Price" // "$" + json.prices[element];

        colorOptionsWrapper.appendChild(price);
    });
    colorContainer.appendChild(colorOptionsWrapper);
    
    wheelTitle = document.createElement("div");
    wheelTitle.setAttribute("class", "box container flex-col optionTitle");
    wheelTitle.innerHTML = "Tires:";
    tiresContainer.appendChild(wheelTitle);

    wheelOptionsWrapper = document.createElement("div");
    wheelOptionsWrapper.id = "tiresOptionsWrapper";
    wheelOptionsWrapper.setAttribute("class", "box container flex-col options-wrapper");

    json.wheels.forEach(function(element) {
        label = document.createElement("label");
        label.setAttribute("class", "box container flex-row radio-container option-center")
        label.innerHTML = json.htmlValues.wheels[element]

        checkbox = document.createElement("input");
        checkbox.type = "radio";
        checkbox.name = "tires";
        checkbox.setAttribute("onclick", "ifChecked()");
        checkbox.value = element;

        span = document.createElement("span");
        span.setAttribute("class", "checkmark");

        label.appendChild(checkbox);
        label.appendChild(span);
        wheelOptionsWrapper.appendChild(label);

        price = document.createElement("div");
        price.setAttribute("class", "box optionPrices option-center");
        price.innerHTML = "Price" // "$" + json.prices[element];

        wheelOptionsWrapper.appendChild(price);
    });
    tiresContainer.appendChild(wheelOptionsWrapper);

    engineTitle = document.createElement("div");
    engineTitle.setAttribute("class", "box container flex-col optionTitle");
    engineTitle.innerHTML = "Engines:";
    engineContainer.appendChild(engineTitle);

    engineOptionsWrapper = document.createElement("div");
    engineOptionsWrapper.id = "enginesOptionsWrapper";
    engineOptionsWrapper.setAttribute("class", "box container flex-col options-wrapper");

    json.engines.forEach(function(element) {
        label = document.createElement("label");
        label.setAttribute("class", "box container flex-row radio-container option-center")
        label.innerHTML = json.htmlValues.engines[element]

        checkbox = document.createElement("input");
        checkbox.type = "radio";
        checkbox.name = "engine";
        checkbox.setAttribute("onclick", "ifChecked()");
        checkbox.value = element;

        span = document.createElement("span");
        span.setAttribute("class", "checkmark");

        label.appendChild(checkbox);
        label.appendChild(span);
        engineOptionsWrapper.appendChild(label);

        price = document.createElement("div");
        price.setAttribute("class", "box optionPrices option-center");
        price.innerHTML = "Price" // "$" + json.prices[element];

        engineOptionsWrapper.appendChild(price);
    });
    engineContainer.appendChild(engineOptionsWrapper);

    otherTitle = document.createElement("div");
    otherTitle.setAttribute("class", "box container flex-col optionTitle");
    otherTitle.innerHTML = "Other:";
    otherContainer.appendChild(otherTitle);
    
    otherOptionsWrapper = document.createElement("div");
    otherOptionsWrapper.id = "otherOptionsWrapper";
    otherOptionsWrapper.setAttribute("class", "box container flex-col options-wrapper");

    json.otherFeatures.forEach(function(element) {
        label = document.createElement("label");
        label.setAttribute("class", "box container flex-row radio-container option-center")
        label.innerHTML = json.htmlValues.other[element]

        checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.setAttribute("onclick", "ifChecked()");
        checkbox.value = element;

        span = document.createElement("span");
        span.setAttribute("class", "checkmark");

        label.appendChild(checkbox);
        label.appendChild(span);
        otherOptionsWrapper.appendChild(label);

        price = document.createElement("div");
        price.setAttribute("class", "box optionPrices option-center");
        price.innerHTML = "Price" // "$" + json.prices[element];

        otherOptionsWrapper.appendChild(price);
    });
    otherContainer.appendChild(otherOptionsWrapper);

    options.appendChild(colorContainer);
    options.appendChild(tiresContainer);
    options.appendChild(engineContainer);
    options.appendChild(otherContainer);

    optionsContainer.appendChild(options);

    buttonDiv = document.createElement("div");
    buttonDiv.id = "buttonArea";
    buttonDiv.setAttribute("class", "box container flex-col");

    button = document.createElement("button");
    button.setAttribute("class", "button");
    button.innerHTML = "Done"

    buttonDiv.appendChild(button);
    optionsContainer.appendChild(buttonDiv);

    return optionsContainer;
}

const setupPreBuilt = (j) =>{
    let containerDiv = document.createElement("div");
    containerDiv.id = "preBuiltContainer";
    containerDiv.setAttribute("class", "box container flex-col");
    
    for(let name in j.preBuilts){
        let presize = document.createElement("div");
        presize.setAttribute("class", "box container flex-col pre-built-size");

        let prename = document.createElement("div");
        prename.setAttribute("class", "box pre-built-name");
        prename.textContent = `${name}`;

        let preid = document.createElement("div");
        preid.id = `${name}`;
        preid.setAttribute("class", "box");

        presize.appendChild(prename);
        presize.appendChild(preid);
        containerDiv.appendChild(presize);
    }

    return containerDiv;
}

const setupSegway = () =>{
    let viewContainerDiv = document.createElement("div");
    viewContainerDiv.id = "segwayViewContainer";
    viewContainerDiv.setAttribute("class", "box container");

    let viewAreaDiv = document.createElement("div");
    viewAreaDiv.id = "segwayArea";
    viewAreaDiv.setAttribute("class", "box container");

    let viewImagesDiv = document.createElement("div");
    viewImagesDiv.id = "segwayImages";

    let priceAreaDiv = document.createElement("div");
    priceAreaDiv.id = "priceArea";
    priceAreaDiv.setAttribute("class", "box container flex-col");
    priceAreaDiv.textContent = `Prices`;

    viewAreaDiv.appendChild(viewImagesDiv);
    viewContainerDiv.appendChild(viewAreaDiv);
    viewContainerDiv.appendChild(priceAreaDiv);

    return viewContainerDiv;
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
