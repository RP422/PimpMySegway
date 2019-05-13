let request = new XMLHttpRequest();


  function loadData() {
    request.open('GET', 'scripts/data.json');
    request.onload = loadComplete;
    request.send();
  }
  
  function loadComplete(evt) {
    let json = JSON.parse(request.responseText);
    updateImage(json);
  }
  
  const updateImage = j => {
    console.log("inside updateImage()");
    console.log(j);
  }

  loadData();
