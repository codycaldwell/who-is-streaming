  function constructOptions() {
    let username = document.getElementById('username');
    let submit = document.getElementById('submit');
    submit.addEventListener('click', function() {
        chrome.storage.sync.set({ username: username.value }, function() {
            fetchLiveStreams().then(function() {
                window.location.href = 'popup.html';
            })
        });
    });
  }
  constructOptions();