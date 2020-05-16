import React, {useEffect, useState} from 'react';
import PlayerControls from './PlayerControls';
import PlayerFooter from './PlayerFooter';

import '../../static/css/playlist.scss';

const AudioPlayer = props => {
    const {playlist} = props;
    const [srcRenderState, updatesrcRenderState] = useState(0);
    const [startTime, UpdateStartTime] = useState(0);
    const [endTime, UpdateEndTime] = useState(0);
    const ee = playlist && playlist.getEventEmitter();
    useEffect(() => {
        if(playlist && ee){
            ee.on("audiorequeststatechange", function(state, src) {
                // Array index refers state value
                // States = ["uninitialized", "loading", "decoding", "finished"];
                updatesrcRenderState(state);
            });
        }
    }, [playlist, ee])
    const renderControls = () => {
        if(srcRenderState === 3){
            return <PlayerControls 
                playlist={playlist} 
                startTime={startTime}
                endTime={endTime}
            />;
        }         
    }
    const renderFooter = () => {
        if(srcRenderState === 3){
            return <PlayerFooter 
                playlist={playlist} 
                startTime={startTime}
                UpdateStartTime={UpdateStartTime}
                endTime={endTime}
                UpdateEndTime={UpdateEndTime} 
            />;
        }         
    }
    
    return (
        <div className="audio-player">
            {renderControls()}
            <div id="playlist"></div>
            {renderFooter()}
            {
                (srcRenderState !== 0 && srcRenderState !== 3) &&
                <h3 className="text-center loader">Loading...</h3>
            }
        </div>
    )
}

export default AudioPlayer;