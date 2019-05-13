//console.log("Hello");
let request = new XMLHttpRequest();


  function loadData() {
    request.open('GET', 'data.json');
    console.log(request);
    request.onload = loadComplete;
    request.send();
  }
  
  function loadComplete(evt) {
    console.log(request.responseText);
    let json = JSON.parse(request.responseText);
    updateImage(json);
  }
  
  const updateImage = j => {
    console.log("I work");
    console.log(j);
  }

  loadData();
