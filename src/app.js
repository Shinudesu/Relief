import React, { Component } from 'react';
import { Position, Toaster } from '@blueprintjs/core';

// import VideoPlayerContainer from './containers/video-player-container';
// import TestContainer from './containers/test-container';
import TitleBar from './components/titlebar';
import VideoPlayerContainer from './containers/video-player-container';

let remote = window.require('electron').remote;

const nyiToaster = Toaster.create({
    position: Position.TOP
});

export default class AppContainer extends Component{

    handleClose = () => {
        let win = remote.getCurrentWindow();
        win.close();
    }

    handleMaximize = () => {
        let win = remote.getCurrentWindow();
        if(win.isMaximized()) {
            win.unmaximize();
        } else {
            win.maximize();
        }
    }

    handleMinimize = () => {
        let win = remote.getCurrentWindow();
        win.minimize();
    };

    handleSettings = () => {
        nyiToaster.show({ message: <span>Feature not yet implemented!</span> })
    }

    render() {
        return(
            <React.Fragment>
                <TitleBar 
                    onClose={this.handleClose}
                    onMax={this.handleMaximize}
                    onMin={this.handleMinimize}
                    onSettings={this.handleSettings} />
                <VideoPlayerContainer />
            </React.Fragment>
        );
    }
}