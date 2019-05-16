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

function loadData() {
  request.open('GET', 'scripts/data.json');
  request.onload = loadComplete;
  request.send();
}

function loadComplete(evt) {
  let json = JSON.parse(request.responseText);
  setDefaultSegway(json);
  updateSegwayImage();
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
  urlString += `url(../images/new_images/${current_segway.color}.png), url(../images/new_images/${current_segway.wheel}.png)`;
  
  segwayStyle.background = urlString;
  segwayStyle.backgroundPosition = "center";
  segwayStyle.backgroundRepeat = "no-repeat";
  segwayStyle.backgroundSize = "contain";
}


loadData();

