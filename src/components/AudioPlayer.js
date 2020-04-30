import React, {useEffect} from 'react';
import {init} from 'waveform-playlist';

import '../static/css/playlist.scss';

const Home = props => {
    const {inputFiles} = props;
    useEffect(() => {
        var playlist = init({
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
            zoomLevels: [500, 1000, 3000, 5000]
          });
          
          playlist
            .load([
            //   {
            //     src: "media/audio/BassDrums30.mp3",
            //     name: "Drums",
            //     start: 8.5,
            //     fadeIn: {
            //       duration: 0.5
            //     },
            //     fadeOut: {
            //       shape: "logarithmic",
            //       duration: 0.5
            //     }
            //   }
            ])
            .then(function() {
              // can do stuff with the playlist.
            });
    }, [inputFiles])

    return (
        <>
        <div id="top-bar" className="playlist-top-bar">
            <div className="playlist-toolbar">
                <div className="btn-group">
                <span className="btn-pause btn btn-warning">
                    <i className="fa fa-pause"></i>
                </span>
                <span className="btn-play btn btn-success">
                    <i className="fa fa-play"></i>
                </span>
                <span className="btn-stop btn btn-danger">
                    <i className="fa fa-stop"></i>
                </span>
                <span className="btn-rewind btn btn-success">
                    <i className="fa fa-fast-backward"></i>
                </span>
                <span className="btn-fast-forward btn btn-success">
                    <i className="fa fa-fast-forward"></i>
                </span>
                </div>
                <div className="btn-group">
                <span title="zoom in" className="btn-zoom-in btn btn-default">
                    <i className="fa fa-search-plus"></i>
                </span>
                <span title="zoom out" className="btn-zoom-out btn btn-default">
                    <i className="fa fa-search-minus"></i>
                </span>
                </div>
                <div className="btn-group btn-playlist-state-group">
                <span className="btn-cursor btn btn-default active" title="select cursor">
                    <i className="fa fa-headphones"></i>
                </span>
                <span className="btn-select btn btn-default" title="select audio region">
                    <i className="fa fa-italic"></i>
                </span>
                <span className="btn-shift btn btn-default" title="shift audio in time">
                    <i className="fa fa-arrows-h"></i>
                </span>
                <span className="btn-fadein btn btn-default" title="set audio fade in">
                    <i className="fa fa-long-arrow-left"></i>
                </span>
                <span className="btn-fadeout btn btn-default" title="set audio fade out">
                    <i className="fa fa-long-arrow-right"></i>
                </span>
                </div>
                <div className="btn-group btn-fade-state-group">
                <span className="btn btn-default btn-logarithmic active">logarithmic</span>
                <span className="btn btn-default btn-linear">linear</span>
                <span className="btn btn-default btn-exponential">exponential</span>
                <span className="btn btn-default btn-scurve">s-curve</span>
                </div>
                <div className="btn-group btn-select-state-group">
                <span className="btn-loop btn btn-success disabled" title="loop a selected segment of audio">
                    <i className="fa fa-repeat"></i>
                </span>
                <span title="keep only the selected audio region for a track" className="btn-trim-audio btn btn-primary disabled">Trim</span>
                </div>
                <div className="btn-group">
                <span title="Prints playlist info to console" className="btn btn-info">Print</span>
                <span title="Clear the playlist's tracks" className="btn btn-clear btn-danger">Clear</span>
                </div>
                <div className="btn-group">
                <span title="Download the current work as Wav file" className="btn btn-download btn-primary">
                    <i className="fa fa-download"></i>
                </span>
                </div>
            </div>
        </div>
        <div id="playlist">
        </div>
        {/*  */}
        <div className="playlist-bottom-bar">
  <form className="form-inline">
  <select className="time-format form-control">
    <option value="seconds">seconds</option>
    <option value="thousandths">thousandths</option>
    <option value="hh:mm:ss">hh:mm:ss</option>
    <option value="hh:mm:ss.u">hh:mm:ss + tenths</option>
    <option value="hh:mm:ss.uu">hh:mm:ss + hundredths</option>
    <option value="hh:mm:ss.uuu" selected="selected">hh:mm:ss + milliseconds</option>
  </select>
  <input type="text" className="audio-start input-small form-control"/>
  <input type="text" className="audio-end form-control"/>
  <label className="audio-pos">00:00:00</label>
</form>

  <form className="form-inline">
    <div className="form-group">
      <label for="master-gain">Master Volume</label>
      <input type="range" min="0" max="100" value="100" className="master-gain form-control" id="master-gain"/>
    </div>
    <div className="checkbox">
      <label>
        <input type="checkbox" className="automatic-scroll"/> Automatic Scroll
      </label>
    </div>
  </form>
  <form className="form-inline">
    <div className="control-group">
      <label for="time">Seek to time :</label>
      <input type="number" className="form-control" id="seektime"/>
      <span className="btn btn-primary btn-seektotime">Seek !</span>
    </div>
  </form>
  
</div>
        </>
    )
}

export default Home;