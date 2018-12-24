import React from 'react';
import ReactDOM from 'react-dom';

import AppContainer from './app';
import * as serviceWorker from './serviceWorker';

import '../node_modules/video.js/dist/video-js.css';
import "../node_modules/@blueprintjs/core/lib/css/blueprint.css";
import "../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css";

import './app.css';

ReactDOM.render(<AppContainer />, document.getElementById('root'));
serviceWorker.unregister();