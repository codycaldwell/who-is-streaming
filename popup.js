var container = document.getElementById('container');
chrome.storage.sync.get('username', function (obj) {
    if (!obj.username) {
        window.location.href = 'options.html';
    } else {
        chrome.storage.sync.get('liveStreamers', function (data) {
            if (!data.liveStreamers) {
                var rip = document.createElement('p');
                rip.innerHTML = 'NO ONE IS LIVE';
                container.appendChild(rip);
            } else {
                data.liveStreamers.forEach(function(stream) {
                    var streamElm = document.createElement('div');
                    streamElm.innerHTML = stream.user_name;
                    container.appendChild(streamElm);
                });
            }
        });
    }
});
