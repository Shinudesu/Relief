import React, { Component } from 'react';
import VideoPlayerTitleBar from './components/video/video-player-titlebar';
import VideoPlayer from './components/video/video-player';

const electron = window.require('electron');
const dialog = electron.remote.dialog;

const mime = window.require('mime-types');
const path = window.require('path');

export default class AppContainer extends Component{
    state = {
        filePath: '',
        fileName: '',
        fileType: ''
    }   

    constructor(props) {
        super(props);

        this.onExitButtonPressed = this.onExitButtonPressed.bind(this);
    }

    onExitButtonPressed() {
        let window = electron.remote.getCurrentWindow();
        window.close();
    }

    componentDidMount() {
        // Open file dialog
        console.log('Called from Mount');
        dialog.showOpenDialog({ properties: ['openFil1e'] }, (files) => {
            if (files !== undefined) {
                let filePath = files[0];
                let fileType = mime.lookup(path.extname(filePath));
                let fileName = path.basename(filePath);

                this.setState({ 
                    fileName: fileName,
                    fileType: fileType,
                    filePath: filePath
                });
            }
        });
    }

    render() {
        if (this.state.fileName === '') {
            return(
                <React.Fragment>
                Opening file
                </React.Fragment>
            );
        } else {
            const videoJsOptions = {
                autoplay: true,
                controls: true,
                sources: [{
                    title: this.state.fileName,
                    src:    this.state.filePath,                    
                    type:   this.state.fileType
                }]  
            };

            return (
                <React.Fragment>
                    <VideoPlayerTitleBar title={ this.state.fileName } onClick ={this.onExitButtonPressed} />
                    <VideoPlayer {...videoJsOptions}/>
                </React.Fragment>
            );
        }        
    }
}