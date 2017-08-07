'use strict';

var PLAYLIST = [
    {
        id: 'j8EIdwydtUM',
        title: `2411 (Audio) [Mini Album - wonderlust]`,
        artist: 'Crush (크러쉬)'
    },
    {
        id: '-UZXEFzWXfc',
        title: `'GOOD BOY' + 'FANTASTIC BABY' in MAMA 2014`,
        artist: 'GD X TAEYANG'
    },
    {
        id: 'ULjVCI37cOA',
        title: `17.06.10 ACT III, M.O.T.T.E in SEOUL "‪삐딱하게"`,
        artist: 'G-DRAGON'
    },
    {
        id: 'bGZZxgixkew',
        title: `BIGBANG - 'LOSER' + 'BAE BAE' + ‘뱅뱅뱅(BANG BANG BANG)' in 2015 MAMA"`,
        artist: 'BIGBANG'
    },
    {
        id: 'GBc0xszmpIY',
        title: `Big Bang-Stupid Liar (0421 Mcountdown)`,
        artist: 'BIGBANG'
    }
    
];
/**
 * 양식
,
    {
        id: '',
        title: ``,
        artist: ''
    }
 * 
 * 
 * id: 재생하고 싶은 유튜브 영상 고유 식별자
 * title: 제목
 * artist: 아티스트
 * 
 * Designed by Hepheir@gmail.com
 * 최종 수정일: 2017-08-06
 * 재배포시 최소한 제작자 정보는 남길 것.
 * 
 * use Material-icons
 *     Youtube iFrame API
 */

var HTML_TEMPLATE = document.createElement('aside');

    HTML_TEMPLATE.id = 'youtube-bgm-player';
    HTML_TEMPLATE.innerHTML = '<div class="media"><input id="isFullScr" class="hidden" type="checkbox"><label class="full-scr-shadow" for="isFullScr"><div id="player"></div></label></div><div class="information"><h1 id="js-ybp--title" class="title">Title</h1><span id="js-ybp--artist" class="artist">Artist</span></div><div class="action"><label class="action__item"><input id="js-ybp--prev" class="hidden" type="button"><svg class="action__icon-svg" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/><path d="M0 0h24v24H0z" fill="none"/></svg></label><label class="action__item"><input id="js-ybp--isPlaying" class="hidden" type="checkbox"><svg class="action__icon-svg" viewBox="0 0 24 24"><path class="play-icon" d="M8 5v14l11-7z"/><path class="pause-icon" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/><path d="M0 0h24v24H0z" fill="none"/></svg></label><label class="action__item"><input id="js-ybp--next" class="hidden" type="button"><svg class="action__icon-svg" viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/><path d="M0 0h24v24H0z" fill="none"/></svg></label></div>';

var CSS_TEMPLATE = document.createElement('style');

    CSS_TEMPLATE.innerHTML = 'body {padding-bottom: 56px;box-sizing: border-box;} #youtube-bgm-player, #youtube-bgm-player * {box-sizing: border-box;} #youtube-bgm-player { width: 100%; height: 56px; position: fixed; bottom: 0; left: 0; z-index: 3; display: flex; flex-direction: row; justify-content: space-between; background-color: #37474F; } #youtube-bgm-player input.hidden { position: fixed; opacity: 0; pointer-events: none; } .media { width: 100px; height: 56px; flex-grow: 0; flex-shrink: 0; background-color: rgb(0, 0, 0); } .full-scr-shadow { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background-color: rgba(0, 0, 0, 0); transition: background-color .2s ease,; cursor: pointer; } input:checked + .full-scr-shadow { position: fixed; bottom: 0; left: 0; z-index: 3; background-color: rgba(0, 0, 0, .84); } #player { width: 100%; height: 100%; max-width: 100px; max-height: 56px; background-color: rgba(0, 0, 0); will-change: max-width, max-height; transition: max-width .2s ease, max-height .2s ease; pointer-events: none; } input:checked + .full-scr-shadow > #player { height: 56.25vw; max-width: 853.4px; max-height: 480px; pointer-events: all; } .information { width: auto; height: 56px; padding: 12px 16px; flex-grow: 1; flex-shrink: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; } .title { height: 16px; margin: 0; display: block; font-size: 16px; line-height: 1; text-align: left; color: rgba(255, 255, 255, .84); } .artist { height: 14px; margin-top: 2px; display: block; font-size: 14px; line-height: 1; text-align: left; color: rgba(255, 255, 255, .56); } .action { display: flex; flex-direction: row; flex-grow: 0; flex-shrink: 0; } .action__item { width: 60px; height: 56px; padding: 10px 12px; flex-grow: 0; flex-shrink: 0; display: block; cursor: pointer; } .action__item:hover { background-color: rgba(255, 255, 255, .1); } svg.action__icon-svg { width: 36px; height: 36px; display: block; fill: rgba(255, 255, 255, .84); } svg.action__icon-svg > * {transition: opacity .2s ease;} svg.action__icon-svg > .play-icon {opacity: 1;} svg.action__icon-svg > .pause-icon {opacity: 0;} input:checked + svg.action__icon-svg > .play-icon {opacity: 0;} input:checked + svg.action__icon-svg > .pause-icon {opacity: 1;}';

document.body.appendChild(CSS_TEMPLATE);
document.body.appendChild(HTML_TEMPLATE);


var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '',
        width: '',
        videoId: PLAYLIST[0].id,
        playerVars: {
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

var PLAYING_INDEX = (function() {
    var index;
    return {
        set: function(i) {
            index = i;
            return index;
        },
        add: function(i) {
            index += i;
            if (index < 0) {
                index += PLAYLIST.length;
            } else if (index >= PLAYLIST.length) {
                index -= PLAYLIST.length;
            }
            return index;
        },
        get: function() {
            return index;
        }
    }
})();


var updateVideoInfo = (function(index) {
    var vidoeoInfo_title = document.getElementById('js-ybp--title'),
        vidoeoInfo_artist = document.getElementById('js-ybp--artist');
    
    return function(index) {
        vidoeoInfo_title.innerHTML = PLAYLIST[index].title;
        vidoeoInfo_artist.innerHTML = PLAYLIST[index].artist;
    };
})();

function loadVideoByIndex(index) {
    player.loadVideoById(PLAYLIST[index].id, 0, "small");
    updateVideoInfo(index);
}

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
        lastPlayedIndex = parseInt(lastPlayedIndex);
        lastPlayedSeconds = parseInt(lastPlayedSeconds);
    } else {
        lastPlayedIndex = 0;
        lastPlayedSeconds = 0;
    }

    loadVideoByIndex(PLAYING_INDEX.set(lastPlayedIndex));

    player.seekTo(lastPlayedSeconds, true);

    player.playVideo();
    savePlayingState();
}

function savePlayingState() {
    // 페이지 이동시에도 이어서 재생 가능하도록 재생정보를 쿠키에 저장
    var d = new Date();
    d.setTime( d.getTime() + (60*60*1000) );
    setInterval(function() {
        document.cookie="YBPindex=" + PLAYING_INDEX.get().toString() + "; expires=" + d.toUTCString() + ";path=/";
        document.cookie="YBPseconds=" + player.getCurrentTime().toString() + "; expires=" + d.toUTCString() + ";path=/";
    }, 500);
    
}



var Input_isPlaying = document.getElementById('js-ybp--isPlaying');

function onPlayerStateChange(evt) {
    var playerState = evt.target.getPlayerState(),
        playerPlaylistIndex = evt.target.getPlaylistIndex();

    // renew video info on new video loads
    if (playerState == YT.PlayerState.ENDED) {
        loadVideoByIndex(PLAYING_INDEX.add(1));

    } else if (playerState != YT.PlayerState.PAUSED) {
        Input_isPlaying.checked = true;
    } else {
        Input_isPlaying.checked = false;
    }
}


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
    if (player.getCurrentTime() > 5) {
        player.seekTo(0, true);
    } else {
        loadVideoByIndex(PLAYING_INDEX.add(-1));
    }
});

document.getElementById('js-ybp--next').addEventListener('click', function() {
    loadVideoByIndex(PLAYING_INDEX.add(1));
});