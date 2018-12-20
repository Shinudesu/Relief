import React from 'react';
import ReactDOM from 'react-dom';

import AppContainer from './app';
import * as serviceWorker from './serviceWorker';

import '../node_modules/video.js/dist/video-js.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/videojs-sublime-skin/dist/videojs-sublime-skin.css';
import '../node_modules/font-awesome/css/font-awesome.css';

import './css/bootstrap.theme.css';
import './css/style.css';

ReactDOM.render(<AppContainer />, document.getElementById('root'));
serviceWorker.unregister();