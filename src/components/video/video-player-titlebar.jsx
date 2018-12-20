import React from 'react';

export default class VideoPlayerTitleBar extends React.Component {
    render() {
        let { title, onClick } = this.props;

        return(            
            <React.Fragment>
                <div id='titlebar'>
                    <div id='video-title'>
                        <span >{ title }</span> 
                    </div>
                    <div className='buttons-wrap' id='titlebar-buttons'>
                        <button className='btn btn-sm' onClick={ onClick } >
                            <i className="fa fa-times right"></i>
                        </button>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}