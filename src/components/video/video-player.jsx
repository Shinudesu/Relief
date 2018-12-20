import React from 'react';
import videojs from 'video.js';

const electron = window.require('electron');
const { ipcRenderer } = electron;

export default class  VideoPlayer extends React.Component {
    componentDidMount() {
        this.player = videojs("video-player", this.props, () => {
            console.log('Player is ready');
        });

        this.player.on('progress', () => {
            if (this.player.bufferedPercent() > 0.1) {
                let titlebar = document.getElementById('titlebar');
                ipcRenderer.send('resize', this.player.videoWidth(), this.player.videoHeight() + titlebar.offsetHeight);
            }
        });
    }

    componentWillUnmount() {
        if (this.player) {
            this.player.dispose();
        }
    }

    render() {
        return (
            <div id='video-container'>
                <video id='video-player' className='video-js'>
                </video>
            </div>
        );
    }
}