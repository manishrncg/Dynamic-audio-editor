import React, {useState, useEffect} from 'react';
import PageContainer from './common/PageContainer';
import UploadForm from './UploadForm.js';
import AudioPlayer from './AudioPlayer/index.js';
import EventEmitter  from 'event-emitter';
import {init} from 'waveform-playlist';

const Home = () => {
    const [inputFiles, setFileValue] = useState([]);
    const [playlist, updatePlaylist] = useState();
    const [list, updateList] = useState([]);
    const updateFile = event => {
        setFileValue(event.target.files);
    };
    
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
                timescale: true,
            },
        
            // you can pass your own event emitter
            EventEmitter()
          );
          updatePlaylist(pl);
        }
    }, [updatePlaylist]);

    useEffect(() => {
        if(inputFiles){
            let newList = [];
            for (var i = 0; i < inputFiles.length; i++) {
                var obj = {
                    src: inputFiles[i],
                    name: inputFiles[i].name
                }
                newList.push(obj);
            }
            updateList(newList);
        }
    }, [inputFiles, updateList]);

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

    return (
        <PageContainer componentClass="home">
            <h2 className="text-center">Dynamic Audio Editor</h2>
            <AudioPlayer inputValue={inputFiles} playlist={playlist} />
            <UploadForm inputValue={inputFiles} updateInputValue={updateFile} playlist={playlist} />                  
        </PageContainer>
    )
}

export default Home;