import React  from "react";
import videoJs from 'video.js';

class WebTorrentTestContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            torrentInfoHash: '',
            torrentMagnetURI: '',
            torrentName: '',
            torrentProgress: '',
            torrentFiles: []
        };
    }

    componentDidMount() {
        // Initialize video.js
        const videoJsOptions = {
            controls: true,
            autoplay: true
        };

        this.player = videoJs('video-player', videoJsOptions, () => {
            console.log('video player ready!');
        });

        // Initialize webtorrent
        var torrentId = 'magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent'

        var WebTorrent = require('webtorrent');
        var client = new WebTorrent();

        client.on('error', (error) => {
            console.log(`Web Torrent error: ${error.message}`);
        });

        client.add(torrentId, (torrent) => {
            const interval = setInterval(() => {
                this.setState({ torrentProgress: (torrent.progress * 100).toFixed(1) + '%' });
            }, 5000);

            torrent.on('done', () => {
                console.log('Progress:100%');
                clearInterval(interval);
            });

            this.setState({
                torrentInfoHash: torrent.infoHash,
                torrentMagnetURI: torrent.magnetURI,
                torrentName: torrent.name,
                torrentFiles: torrent.files
            });
            
            var file = torrent.files.find((file) => {
                return file.name.endsWith('.mp4');
            });

            file.renderTo('video#video-player', {}, () => {
                console.log('ready to play!');
            });
        });
    }

    render() {
        return(
            <div>
                <h1>Hello WebTorrent</h1>
                <div id='video-player'></div>
                <p>Torrent Info Hash: <b>{ this.state.torrentInfoHash }</b></p>
                <p>Torrent Progress: <b>{ this.state.torrentProgress }</b></p>
                <video id='video-player' className='video-js vjs-default-skin'></video>
            </div>
        );
    }
}

export default WebTorrentTestContainer;