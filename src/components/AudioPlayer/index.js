import React, {useEffect, useState} from 'react';
import PlayerControls from './PlayerControls';
import PlayerFooter from './PlayerFooter';
import EventEmitter  from 'event-emitter';
import {init} from 'waveform-playlist';

import '../../static/css/playlist.scss';

const AudioPlayer = props => {
    const {inputValue} = props;
    const [playlist, updatePlaylist] = useState();
    const [list, updateList] = useState([]);
    // let playlist = null;
    useEffect(() => {
        if(document.getElementById("playlist")){
            let pl = init(
            {
                samplesPerPixel: 3000,
                mono: true,
                waveHeight: 100,
                container: document.getElementById("playlist"),
                state: "cursor",
                colors: {
                    waveOutlineColor: "#E0EFF1",
                    timeColor: "grey",
                    fadeColor: "black"
                },
                controls: {
                    show: true,
                    width: 200
                },
                zoomLevels: [500, 1000, 3000, 5000],
                play:"start",
            },
        
            // you can pass your own event emitter
            EventEmitter()
          );
          updatePlaylist(pl);
        }
    }, [updatePlaylist])

    useEffect(() => {
        if(inputValue){
            let newList = [];
            for (var i = 0; i < inputValue.length; i++) {
                var obj = {
                    src: inputValue[i],
                    name: inputValue[i].name
                }
                newList.push(obj);
            }
            updateList(newList);
        }
    }, [inputValue, updateList])
    
    useEffect(() => {
      if(playlist){
          playlist
          .load(list)
          .then(function() {
              // can do stuff with the playlist.
              //initialize the WAV exporter.
              playlist.initExporter();
          });
      }
    }, [playlist, list])

    const renderControls = () => {
        if(inputValue && inputValue.length > 0){
            return <PlayerControls playlist={playlist} />;
        }         
    }
    const renderFooter = () => {
        if(inputValue && inputValue.length > 0){
            return <PlayerFooter />;
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