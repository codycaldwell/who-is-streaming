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
                var gameToStreamerMap = data.liveStreamers.reduce(function(acc, stream) {
                    if (!acc[stream.game_id])
                        acc[stream.game_id] = [];
                    acc[stream.game_id].push(stream);
                    return acc;
                }, {});
                Object.keys(gameToStreamerMap).forEach(function(game) {
                    var dummyGame = document.getElementById('dummy_game');
                    var gameNode = dummyGame.cloneNode(true);
                    gameNode.id = game;
                    gameNode.querySelector('.game_title').innerHTML = game;
                    gameToStreamerMap[game].forEach(function(streamer) {
                        var dummyStream = document.getElementById('dummy_stream');
                        var streamNode = dummyStream.cloneNode(true);
                        streamNode.id = streamer.user_name;
                        streamNode.href = 'https://twitch.tv/' + streamer.user_name;
                        streamNode.querySelector('.user_name').innerHTML = streamer.user_name;
                        streamNode.querySelector('.viewer_count').innerHTML = streamer.viewer_count;
                        streamNode.style = 'display: flex';
                        gameNode.appendChild(streamNode);

                    });
                    gameNode.style = 'display: block';
                    container.appendChild(gameNode);
                });
            }
        });
    }
});
