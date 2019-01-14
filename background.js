var USER_ENDPOINT = 'https://api.twitch.tv/helix/users?login=';
var FOLLOWING_ENDPOINT = 'https://api.twitch.tv/helix/users/follows?from_id=';
var STREAMING_ENDPOINT = 'https://api.twitch.tv/helix/streams?user_login=';
var CLIENT_ID = '<CLIENT_ID_HERE>';

function fetchLiveStreams() {
    var live = [];
    fetchUserData().then(function(user) {
        fetchFollowingList(user).then(function(list) {
            fetchStreamerInfoList(list).then(function(statuses) {
                live = statuses.filter(function(status) {
                    return status.type === 'live';
                });
                chrome.storage.sync.set({ liveStreamers: live });
            })
        });
    });
}

function fetchUserData() {
    return new Promise(function(resolve, reject) {
        var url = USER_ENDPOINT + userName;
        fetch(url, {
            headers: {
                "Client-ID": CLIENT_ID
            }
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            resolve(json && json.data && json.data[0] && json.data[0].id);
        });
    });
}

function fetchFollowingList(user_id) {
    return new Promise(function(resolve, reject) {
        var url = FOLLOWING_ENDPOINT + user_id;
        fetch(url, {
            headers: {
                "Client-ID": CLIENT_ID
            }
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            var follow_list = json.data.map(function(streamer) {
                return streamer && streamer.to_name;
            })
            resolve(follow_list);
        });
    });
}

function fetchStreamerInfoList(following) {
    var streamerPromises = following.map(function(stream) {
        return new Promise(function (resolve, reject) {
            var url = STREAMING_ENDPOINT + stream;
            fetch(url, {
                headers: {
                    "Client-ID": CLIENT_ID
                }
            })
            .then(function(response) {
                return response.json();
            })
            .then(function(json) {
                resolve(json && json.data && json.data[0] || {});
            });
        });
    });
    return Promise.all(streamerPromises);
}

chrome.storage.sync.get('username', function(obj) {
    if (obj.username)
        fetchLiveStreams();
});