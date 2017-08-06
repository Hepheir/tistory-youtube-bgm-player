'use strict';

var PLAYLIST_ID = 'PLSGdYLt-DLMVeXnrGGRao1YfvNGD95SD8';

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '',
        width: '',
        videoId: '',
        playerVars: {
            listType: 'playlist',
            list: PLAYLIST_ID,

            cc_load_policy: 0,
            iv_load_policy: 3,
            controls: 1,
            loop: 1
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
};

var Input_isPlaying = document.getElementById('js-ybp--isPlaying');

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return false;
}

function onPlayerReady(evt) {
    var lastPlayedIndex = getCookie('YBPindex'),
        lastPlayedSeconds = getCookie('YBPseconds');
    if (lastPlayedIndex && lastPlayedSeconds) {
        player.playVideoAt(parseInt(lastPlayedIndex));
        player.seekTo(parseInt(lastPlayedSeconds), true);
    }
    evt.target.playVideo();
}

function onPlayerStateChange(evt) {
    var playerState = evt.target.getPlayerState();

    if (playerState != YT.PlayerState.PAUSED) {
        Input_isPlaying.checked = true;
    } else {
        Input_isPlaying.checked = false;
    }
}

function savePlayingState() {
    // 페이지 이동시에도 이어서 재생 가능하도록 재생정보를 쿠키에 저장
    var d = new Date();
    d.setTime( d.getTime() + (60*60*1000) );
    setInterval(function() {
        document.cookie="YBPindex=" + player.getPlaylistIndex().toString() + "; expires=" + d.toUTCString() + ";path=/";
        document.cookie="YBPseconds=" + player.getCurrentTime().toString() + "; expires=" + d.toUTCString() + ";path=/";
    }, 1000);
    
}
savePlayingState();



Input_isPlaying.addEventListener('click', function() {
    var playerState = player.getPlayerState();

    if (playerState == YT.PlayerState.PLAYING) {
        player.pauseVideo();
        Input_isPlaying.checked = false;
    } else {
        player.playVideo();
        Input_isPlaying.checked = true;
    }
});

document.getElementById('js-ybp--prev').addEventListener('click', function() {
    player.previousVideo()
});

document.getElementById('js-ybp--next').addEventListener('click', function() {
    player.nextVideo()
});