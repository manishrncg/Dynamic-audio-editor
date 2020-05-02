import React, {useEffect, useState} from 'react';
import PlayerControls from './PlayerControls';
import PlayerFooter from './PlayerFooter';

import '../../static/css/playlist.scss';

const AudioPlayer = props => {
    const {inputValue, playlist} = props;
    const renderControls = () => {
        if(inputValue && inputValue.length > 0){
            return <PlayerControls playlist={playlist} />;
        }         
    }
    const renderFooter = () => {
        if(inputValue && inputValue.length > 0){
            return <PlayerFooter playlist={playlist} />;
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