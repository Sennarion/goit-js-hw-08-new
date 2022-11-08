import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const LOCALSTORAGE_KEY = 'videoplayer-current-time';
const storagePlayerTime = window.localStorage.getItem(LOCALSTORAGE_KEY);

if (storagePlayerTime) {
  player.setCurrentTime(storagePlayerTime);
}

player.on(
  'timeupdate',
  throttle(data => {
    window.localStorage.setItem(LOCALSTORAGE_KEY, data.seconds);
  }, 1000)
);
