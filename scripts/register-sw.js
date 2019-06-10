if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('scripts/serviceworker.js')
          .then((reg) => {
            console.log('Service worker registered.', reg);
          });
    });
  }