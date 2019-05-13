//let json;

//Loading in JSON date
function loadData() {
  request.open('GET', 'data.json');
  request.onload = loadComplete;
  request.send();
}

function loadComplete(evt) {
  let json = JSON.parse(request.responseText);
  updateImage(json);
}

const updateImage = () => {
  console.log("I work");
  console.log(json[0].currentSegway);
}
