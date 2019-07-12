
//execute while loading page
//sw gets registered
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('serviceworker.js')
    .then((reg) => {
      console.log('Service worker registered.', reg);
    });   
  }