document.getElementById('authorize').addEventListener('click', function() {
    chrome.identity.getAuthToken({ interactive: true }, function(token) {
      if (chrome.runtime.lastError) {
        alert('Error: ' + chrome.runtime.lastError);
      } else {
        console.log('Token: ' + token);
        // You can now use this token to authenticate API requests
      }
    });
  });
  
  document.getElementById('setInterval').addEventListener('click', function() {
    let interval = prompt("Enter the interval in minutes for sending facts (e.g., 1440 for daily):");
    if (interval) {
      chrome.storage.local.set({ "interval": interval });
    }
  });
  