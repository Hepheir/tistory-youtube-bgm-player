var playlistID = 'PLmxVF8ick5cTI_lZ_O-FqCC2CrzqZ8BxZ';

function createYTbgmPlayer() {
    var player = document.createElement('aside');
    player.id = 'youtube-bgm-player';
    player.innerHTML = '<style>'
                     + '#youtube-bgm-player, #youtube-bgm-player * { box-sizing: border-box; } #youtube-bgm-player { width: 100%; height: 100%; position: fixed; top: 0; left: 0; pointer-events: none; } .player-layout { width: 100%; height: 100%; max-height: 56px; overflow: hidden; position: absolute; bottom: 0; left: 0; background-color: #37474F; pointer-events: all; transition: max-height .2s ease; } .bar { width: 100%; height: 100%; max-height: 56px; display: flex; } .player-container { width: 100%; height: 480px; max-width: 100px; max-height: 56px; flex-grow: 0; flex-shrink: 0; background-color: rgb(0, 0, 0); display: block; transition: max-width .2s ease, max-height .2s ease; } #player { width: 100%; height: 100%; max-width: 854px; max-height: 480px; margin: 0 auto; display: block; pointer-events: none; } .player-control { width: 100%; height: 100%; flex-grow: 1; flex-shrink: 1; display: flex; justify-content: space-between; opacity: 1; transition: opacity .2s ease; } .p__info { height: 56px; padding: 12px 16px; } .info__title, .info__artist { width: 100%; height: 16px; display: block; line-height: 1; } .info__title { font-size: 16px; color: rgba(255, 255, 255, .84); } .info__artist { padding-top: 2px; font-size: 14px; color: rgba(255, 255, 255, .56); } .p__icon { padding: 10px 24px; border: none; flex-grow: 0; flex-shrink: 0; display: block; background-color: transparent; cursor: pointer; } #listmode--toggle:checked~.player-layout { max-height: 100%; overflow-y: auto; } #listmode--toggle:checked~.player-layout .player-container, #listmode--toggle:checked~.player-layout .bar { max-width: 100%; max-height: 480px; } #listmode--toggle:checked~.player-layout #player { pointer-events: all; } #listmode--toggle:checked~.player-layout .player-control { opacity: 0; } #listmode--toggle:checked~.player-layout .player-container { pointer-events: none; }'
                     + '</style><input id="listmode--toggle" type="checkbox" style="position:fixed;opacity:0;pointer-events:none;"><div class="player-layout"><div class="bar"><label class="player-container" for="listmode--toggle"><div id="player"></div></label><nav class="player-control"><div class="p__info"><span id="js--title" class="info__title">Title</span><span id="js--artist" class="info__artist">artist</span></div><button id="js--play" class="p__icon"><svg fill="rgba(255, 255, 255, .84)" height="36" viewBox="0 0 24 24" width="36"><path class="play" d="M8 5v14l11-7z"/><path class="pause" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/><path d="M0 0h24v24H0z" fill="none"/></svg></button></nav></div><div class="drawer"><label id="list-control" for="listmode--toggle">닫기닫기닫기닫기닫기닫기닫기</label><ul id="play-list"><li>1.</li></ul></div></div>';

    document.body.appendChild(player);
}
createYTbgmPlayer();



var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '100%',
        width: '100%',
        videoId: '',
        playerVars: { },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {

    player.loadPlaylist({
        listType: 'playlist',
        list: playlistID,
        index: 0,
        startSeconds: 0,
        suggestedQuality: 'small'
    });
    event.target.playVideo();
}


var done = false;
function onPlayerStateChange(event) {
    // if (event.data == YT.PlayerState.PLAYING && !done) {
    //     setTimeout(stopVideo, 6000);
    //     done = true;
    // }
}

function stopVideo() {
    player.stopVideo();
}


document.getElementById('js--play').addEventListener('click', function() {
    if (player.getPlayerState() != 2) {
        player.pauseVideo();
    } else {
        player.playVideo();
    }
});