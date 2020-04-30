import React from 'react';
import PlayerControls from './PlayerControls';
import PlayerFooter from './PlayerFooter';

import '../../static/css/playlist.scss';

const AudioPlayer = props => {
    const {filesArr} = props;
    const renderControls = () => {
        if(filesArr && filesArr.length > 0){
            return <PlayerControls/>;
        }         
    }
    const renderFooter = () => {
        if(filesArr && filesArr.length > 0){
            return <PlayerFooter/>;
        }         
    }
    return (
        <div className="audio-player">
            {renderControls()}
            <div id="playlist"></div>
            {renderFooter()}
        </div>
    )
}

export default AudioPlayer;