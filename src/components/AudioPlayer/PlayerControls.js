import React, {useEffect, useState} from 'react';

const PlayerControls = props => {
    const {playlist} = props;
    const [isLooping, updateLooping] = useState(false);
    // retrieves the event emitter the playlist is using.
    const ee = playlist && playlist.getEventEmitter();
    let playoutPromises;
    let startTime = 0;
    let endTime = 0;

    useEffect(() => {
        ee.on('finished', function () {
            console.log("The cursor has reached the end of the selection !");
          
            if (isLooping && playoutPromises) {
              playoutPromises.then(function() {
                playoutPromises = playlist.play(startTime, endTime);
              });
            }
          });
    }, [isLooping, ee, playlist, playoutPromises, startTime, endTime]);

    const toggleActive = node => {
        var active = node.parentNode.querySelectorAll('.active');
        var i = 0, len = active.length;
        for (; i < len; i++) {
          active[i].classList.remove('active');
        }
      
        node.classList.toggle('active');
    };
    const playVideo = () => {
        ee.emit("play");
    };
    const pauseVideo = () => {
        updateLooping(false);
        ee.emit("pause");
    };
    const stopAudio = () =>{
        updateLooping(false);
        ee.emit("stop");
    };
    const zoominOut = zoomIn => {
        if(zoomIn){
            ee.emit("zoomin");
        } else{
            ee.emit("zoomout");
        }
    };
    // const clearList = () => {
    //     updateLooping(false);
    //     ee.emit("clear");
    // };
    const cursorUpdate = e => {
        ee.emit("statechange", "cursor");
        toggleActive(e.target);
    };
    const playFromLastSelection = () => {
        updateLooping(true);
        playoutPromises = playlist.play(startTime, endTime);
    };
    const select = e => {
        ee.emit("statechange", "select");
        toggleActive(e.target);
    };
    // 
    const shiftWave = e => {
        ee.emit("statechange", "shift");
        toggleActive(e.target);
    };
      
    const fadeIn = e => {
        ee.emit("statechange", "fadein");
        toggleActive(e.target);
    };
    const fadeOut = e => {
        ee.emit("statechange", "fadeout");
        toggleActive(e.target);
    };
      
      //fade types
    const logarithmicWave = e => {
        ee.emit("fadetype", "logarithmic");
        toggleActive(e.target);
    };
      
    const linearWave = e => {
        ee.emit("fadetype", "linear");
        toggleActive(e.target);
    };
      
    const scurveWave = e => {
        ee.emit("fadetype", "sCurve");
        toggleActive(e.target);
    };
      
    const exponentialWave = e => {
        ee.emit("fadetype", "exponential");
        toggleActive(e.target);
    };
      
    const trimAudio = () => {
        ee.emit("trim");
    };
    // 
    const downloadAudio = () => {
        ee.emit('startaudiorendering', 'wav');
    };

    return (
        <div id="top-bar" className="playlist-top-bar">
            <div className="playlist-toolbar">
                <div className="btn-group">
                <span className="btn-pause btn btn-warning" onClick={pauseVideo}>
                    <i className="fa fa-pause"></i>
                </span>
                <span className="btn-play btn btn-success" onClick={playVideo}>
                    <i className="fa fa-play"></i>
                </span>
                <span className="btn-stop btn btn-danger" onClick={stopAudio}>
                    <i className="fa fa-stop"></i>
                </span>
                </div>
                <div className="btn-group">
                <span title="zoom in" className="btn-zoom-in btn btn-default" onClick={() => zoominOut(true)}>
                    <i className="fa fa-search-plus"></i>
                </span>
                <span title="zoom out" className="btn-zoom-out btn btn-default" onClick={() => zoominOut(false)}>
                    <i className="fa fa-search-minus"></i>
                </span>
                </div>
                <div className="btn-group btn-playlist-state-group">
                <span className="btn-cursor btn btn-default active" title="select cursor" onClick={e => cursorUpdate(e)}>
                    <i className="fa fa-headphones"></i>
                </span>
                <span className="btn-select btn btn-default" title="select audio region" onClick={e => select(e)}>
                    <i className="fa fa-italic"></i>
                </span>
                <span className="btn-shift btn btn-default" title="shift audio in time" onClick={e => shiftWave(e)}>
                    <i className="fa fa-arrows-h"></i>
                </span>
                <span className="btn-fadein btn btn-default" title="set audio fade in" onClick={e => fadeIn(e)}>
                    <i className="fa fa-long-arrow-left"></i>
                </span>
                <span className="btn-fadeout btn btn-default" title="set audio fade out" onClick={e => fadeOut(e)}>
                    <i className="fa fa-long-arrow-right"></i>
                </span>
                </div>
                <div className="btn-group btn-fade-state-group">
                <span className="btn btn-default btn-logarithmic active" onClick={e => logarithmicWave(e)}>logarithmic</span>
                <span className="btn btn-default btn-linear" onClick={e => linearWave(e)}>linear</span>
                <span className="btn btn-default btn-exponential" onClick={e => exponentialWave(e)}>exponential</span>
                <span className="btn btn-default btn-scurve" onClick={e => scurveWave(e)}>s-curve</span>
                </div>
                <div className="btn-group btn-select-state-group">
                <span className="btn-loop btn btn-success disabled" title="loop a selected segment of audio" onClick={playFromLastSelection}>
                    <i className="fa fa-repeat"></i>
                </span>
                <span title="keep only the selected audio region for a track" className="btn-trim-audio btn btn-primary disabled" onClick={trimAudio}>Trim</span>
                </div>
                <div className="btn-group">
                <span title="Download the current work as Wav file" className="btn btn-download btn-primary" onClick={downloadAudio}>
                    <i className="fa fa-download"></i>
                </span>
                </div>
            </div>
        </div>
    )
}

export default PlayerControls;