import React from 'react';
import videoJs from 'video.js';

import './video-player.css';

const mousetrap = window.require('mousetrap');
const remote = window.require('electron').remote;
const { dialog } = remote;

const mime = require('mime-types');
const path = require('path');

class WebTorrentTest extends React.Component {  
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
            preload: 'auto',

        }; 

        // Create the video player
        this.player = videoJs(this.videoNode, videoJsOptions, () => {
            console.log('Player created!');
        });

        // Initialize webtorrent
        var torrentId = 'magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent'

        var WebTorrent = require('webtorrent');
        var client = new WebTorrent();

        client.on('error', (err) => {
            console.log(`WebTorrent error: ${err.message}`);
        });

        client.add(torrentId, (torrent) => {
            console.log('web torrent loaded!');
            
            torrent.on('download', function (bytes) {
                console.log('just downloaded: ' + bytes)
                console.log('total downloaded: ' + torrent.downloaded)
                console.log('download speed: ' + torrent.downloadSpeed)
                console.log('progress: ' + torrent.progress)
            });

            var mp4File = torrent.files.find((file) => {
                return file.name.endsWith('.mp4')
            })
            
            var poster = torrent.files.find((file) => {
                return file.name.endsWith('.jpg');
            });

            this.player.poster(poster.path);

            mp4File.renderTo(this.videoNode, {}, (err, html) => {
                console.log('ready to play!');
            });
        });
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
        return(
            <div className='video-player-wrapper'>
                <video ref={node => this.videoNode = node} className='video-js vjs-default-skin'></video>
            </div>
        );
    }
}

export default WebTorrentTest;