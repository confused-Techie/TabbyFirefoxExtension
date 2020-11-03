var addButton = document.getElementById("addBMClick");
var gotoBookMark = document.getElementById("gotoBookMarkClick");

addButton.onclick = function() {

  let serverAddress = browser.storage.local.get("server");
  serverAddress.then(GrabServerSuccess, GrabServerFailure);

}

gotoBookMark.onclick = function() {
  //It seems that at times this will fail to redirect,
  //producing 'Promise resolved while context is inactive'
  //this happens if the inside of the extension window isn't
  //clicked first
  //but double clicking the button does cause it to work
  let serverLocation = browser.storage.local.get("server");
  serverLocation.then(GrabServerGOTOSuccess, GrabServerGOTOFailure);
}

function GrabServerSuccess(item) {
  var userURI = "";
  var apiCall = "/api?type=new&bm=";
  browser.tabs.query({active:true,currentWindow:true}, function(tabs) {
    var activeTab = tabs[0];
    userURI = activeTab.url;
    var request = item.server + apiCall + userURI;


    fetch(request)
      .then(response => {
        if (!response.ok) {
          logFailure("Network Response was not Ok.");
        }
        return response.json();
      })
      .then(data => determineResult(data))
      .catch(error => {
        logFailure(error);
      });
  });
}

function GrabServerFailure(error) {
  logFailure('Status: ERROR: No Server Set: '+error);
}

function determineResult(results) {
  if (results == "Success") {
    logSuccess();
  } else {
    logFailure(results);
  }
}


function GrabServerGOTOSuccess(item) {
  browser.tabs.create({'url': item.server});
}
function GrabServerGOTOFailure(error) {
  console.log('Error: '+error);
}

function logSuccess() {
  document.getElementById("statusMessage").innerHTML = "Status: Sucessfully Saved.";
}

function logFailure(respIssue) {
  document.getElementById("statusMessage").innerHTML = "Status: Error: " + String(respIssue);
}
