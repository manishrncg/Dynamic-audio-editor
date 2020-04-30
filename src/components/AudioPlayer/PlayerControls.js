import React from 'react';

const PlayerControls = () => {
    return (
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
    )
}

export default PlayerControls;