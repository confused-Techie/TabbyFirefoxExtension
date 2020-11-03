var saveServer = document.getElementById('serverAddressButton');

saveServer.onclick = function() {
  var serverLocation = document.getElementById("serverAddress").value;

  browser.storage.local.set({
    server: serverLocation
  });
  console.log("Server Saved");
  let gettingItem = browser.storage.local.get("server");
  gettingItem.then(onGot, onError);
}

function onGot(item) {
  console.log(item);
  //console.log("Parsed"+item.server);
  //This does correctly display the data within the Object
}
function onError(error) {
  console.log('Error: '+error);
}
