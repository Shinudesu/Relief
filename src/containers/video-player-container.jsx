import React from 'react';
import ReactDOM from 'react-dom';
import videoJs from 'video.js';

import './video-player.css';
import { Icon, Popover } from '@blueprintjs/core';

const mousetrap = window.require('mousetrap');
const remote = window.require('electron').remote;
const { dialog } = remote;

const mime = require('mime-types');
const path = require('path');

class VideoPlayerContainer extends React.Component {  
    constructor(props) {
        super(props);

        // Initialize container state
        this.state = {
            file: {
                name: '',
                path: '',
                type: ''
            }
        }        

        // Initialize bindings
        mousetrap.bind(['command+o', 'ctrl+o'], () => {
            this.openFileDialog();
        });
    }

    componentDidMount() {
        // Initialize video js options
        const videoJsOptions = {
            autoplay: true,
            controls: true,
            preload: 'none'
        }; 

        // Create the video player
        this.player = videoJs('video-player', videoJsOptions, () => {
            console.log('Player created!');
        });

        // Register custom component
        videoJs.registerComponent('openFileButton', OpenFileVJSComponent);       
        
        this.player.controlBar.addChild('openFileButton', {
            handleOnClick: this.openFileDialog
        }, 0);
    }

    componentWillUnmount() {
        // Remove bindings
        mousetrap.unbind(['command+o', 'ctrl+o']);
        if (this.player) {
            this.player.dispose();
        }
    }

    openFileDialog = () => {
        dialog.showOpenDialog({ properties: ['openFil1e'] }, (files) => {
            if (files !== undefined) {
                let file = {
                    name: path.basename(files[0]),
                    path: files[0],
                    type: mime.lookup(path.extname(files[0]))
                }

                this.setState({ file: file });
            }
        });
    }

    render() {
        console.log('test');
        // Check to see if a source has been added
        if (this.state.file.path !== '') {
            this.player.src([{
                src: this.state.file.path,
                type: this.state.file.type
            }]);
        }

        return(
            <div className='video-player-wrapper'>
                <video id='video-player' className='video-js vjs-default-skin'></video>
            </div>
        );
    }
}

export default VideoPlayerContainer;

const vjsCompmonent = videoJs.getComponent('Button');

class OpenFileVJSComponent extends vjsCompmonent {
    constructor(player, options) {
        super(player, options);

        this.on('click', options.handleOnClick);

        this.mount = this.mount.bind(this);

        player.ready(() => {
            this.mount();
        });

        this.on('dispose', () => {
            ReactDOM.unmountComponentAtNode(this.el());
        });
    }

    mount() {
        ReactDOM.render(
            (<React.Fragment>
                <Popover content={tempPopover} defaultIsOpen='true' position='top-left'>
                    <Icon icon='folder-open' iconSize='13' />
                </Popover>
            </React.Fragment>),
            this.el()
        );
    }
}

const tempPopover = (
    <div style={{ padding:'10px' }}>
        Click here to open a video.
    </div>
);

