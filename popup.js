var container = document.getElementById('container');
chrome.storage.sync.get('username', function (obj) {
    if (!obj.username) {
        var optionsLink = document.createElement('a');
        optionsLink.innerHTML = 'set username in options';
        optionsLink.href = 'chrome-extension://' + chrome.runtime.id +'/options.html';
        container.appendChild(optionsLink);
    } else {
        chrome.storage.sync.get('liveStreamers', function (data) {
            data.liveStreamers.forEach(function(stream) {
                var streamElm = document.createElement('div');
                streamElm.innerHTML = stream.user_name;
                container.appendChild(streamElm);
            });
        });
    }
});
