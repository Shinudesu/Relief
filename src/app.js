import React, { Component } from 'react';
import { Route, Switch, MemoryRouter } from 'react-router-dom';
import { Position, Toaster } from '@blueprintjs/core';

import TitleBar from './components/titlebar';
import WebTorrentTest from './containers/webtorrent-test';
import VideoPlayerContainer from './containers/video-player-container';

let remote = window.require('electron').remote;

const nyiToaster = Toaster.create({
    position: Position.TOP, 
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
        nyiToaster.show({ message: <span>Feature not yet implemented!</span>, timeout: 1500 })
    }

    render() {
        return (
            <React.Fragment>
                <TitleBar 
                    onClose={this.handleClose}
                    onMax={this.handleMaximize}
                    onMin={this.handleMinimize}
                    onSettings={this.handleSettings} />

                <MemoryRouter>
                    <Switch>
                        <Route path='/video' component={VideoPlayerContainer} />
                        <Route path='/' component={WebTorrentTest} />
                    </Switch>
                </MemoryRouter>
            </React.Fragment>
        );
    }
}