function listenForClicks() {
  document.addEventListener("click", (e) => {

    function gotoServer(gotoBook) {

    }

    function addBookMark(addBook) {
      //attempt to add current tab to the BookMarks
      var xhr = new XMLHttpRequest();
      var userURI = "";

      browser.tabs.query({currentWindow: true, active: true}).then((tabs) => {
        userURI = tabs[0];
        console.log(userURI.url);
      }, console.error);
    }
  })
}
