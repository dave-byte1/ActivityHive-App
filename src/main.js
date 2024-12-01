import './assets/main.css';
import {createApp} from 'vue'
import App from './App.vue'
import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';

import {
    faBookOpen,
    faFlask,
    faPalette,
    faChessKnight,
    faDumbbell,
    faLandmark,
    faLaptopCode,
    faTheaterMasks,
    faMusic,
    faCamera,
    faPen,
} from '@fortawesome/free-solid-svg-icons';

library.add(
    faBookOpen,
    faFlask,
    faPalette,
    faChessKnight,
    faDumbbell,
    faLandmark,
    faLaptopCode,
    faTheaterMasks,
    faMusic,
    faCamera,
    faPen
);

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
