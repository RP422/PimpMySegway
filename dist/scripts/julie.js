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

window.onload = () => {
  var c = document.getElementById("segwayArea");
  var ctx = c.getContext("2d");

  //var image = document.getElementById("image");
  var imgs = document.getElementsByClassName("image");
  console.log(imgs);
  for (let img in imgs) {
    //console.log(img);
    console.log(imgs[0]);
    ctx.drawImage(imgs[0], 0, 0, 100, 100);
  }
};

function loadData() {
  request.open('GET', 'scripts/data.json');
  request.onload = loadComplete;
  request.send();
}

function loadComplete(evt) {
  let json = JSON.parse(request.responseText);
  initialSegwayView(json);
  updateImage();
}

const initialSegwayView = j => {
  for (let index in j.default_segway) {
    for (let i in current_segway) {
      current_segway[i] = j.default_segway[i];
    }
  }
  //console.log(current_segway);
}

const updateImage = () => {
  for (let i in current_segway) {
    //console.log(current_segway[i]);
    let opt = current_segway[i];
    if (opt == true) {
      console.log("true");
    }
    else if (opt == false) {
      console.log("false");      
    }
    else {
      console.log(i);
      console.log(opt);
    }
  }
  //console.log(current_segway);
}

const settingSegwayOptions = () => {
  
}

//loadData();

