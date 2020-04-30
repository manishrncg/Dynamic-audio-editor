import React from 'react';

const PlayerFooter = () => {
    return (
        <div className="playlist-bottom-bar">
            <form className="form-inline">
                <select className="time-format form-control">
                <option value="seconds" selected="selected">seconds</option>
                <option value="thousandths">thousandths</option>
                <option value="hh:mm:ss">hh:mm:ss</option>
                <option value="hh:mm:ss.u">hh:mm:ss + tenths</option>
                <option value="hh:mm:ss.uu">hh:mm:ss + hundredths</option>
                <option value="hh:mm:ss.uuu" >hh:mm:ss + milliseconds</option>
                </select>
                <input type="text" className="audio-start input-small form-control" />
                <input type="text" className="audio-end form-control" />
                <label className="audio-pos">00:00:00</label>
            </form>
            <form className="form-inline">
                <div className="form-group">
                <label htmlFor="master-gain">Master Volume</label>
                <input type="range" min="0" max="100" value="100" className="master-gain form-control" id="master-gain"/>
                </div>
                <div className="checkbox">
                <label>
                    <input type="checkbox" className="automatic-scroll" /> Automatic Scroll
                </label>
                </div>
            </form>
            <form className="form-inline">
                <div className="control-group">
                <label htmlFor="time">Seek to time :</label>
                <input type="number" className="form-control" id="seektime" value="0"/>
                <span className="btn btn-primary btn-seektotime">Seek !</span>
                </div>
            </form>
        </div>
    )
}

export default PlayerFooter;