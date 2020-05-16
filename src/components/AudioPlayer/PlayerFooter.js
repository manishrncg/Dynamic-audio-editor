import React, {useState, useEffect, useCallback} from 'react';

const PlayerFooter = props => {
    const {
        playlist, 
        startTime,
        UpdateStartTime,
        endTime,
        UpdateEndTime
    } = props;
    const [seekTime, UpdateSeekTime] = useState();
    const [format, UpdateFormat] = useState("seconds");
    const [playbackSpeed, UpdatePlaybackSpeed] = useState(1);
    const [audioPos, UpdateAudioPos] = useState(0);
    const [audioStatus, UpdateAudioStatus] = useState(0);
    // retrieves the event emitter the playlist is using.
    const ee = playlist && playlist.getEventEmitter();
    const cueFormatters = useCallback(() => {
        const clockFormat = (seconds, decimals) => {
          var hours,
              minutes,
              secs,
              result;
      
          hours = parseInt(seconds / 3600, 10) % 24;
          minutes = parseInt(seconds / 60, 10) % 60;
          secs = seconds % 60;
          secs = secs.toFixed(decimals);
      
          result = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (secs < 10 ? "0" + secs : secs);
      
          return result;
        }
      
        var formats = {
          "seconds": function (seconds) {
              return seconds.toFixed(0);
          },
          "thousandths": function (seconds) {
              return seconds.toFixed(3);
          },
          "hh:mm:ss": function (seconds) {
              return clockFormat(seconds, 0);   
          },
          "hh:mm:ss.u": function (seconds) {
              return clockFormat(seconds, 1);   
          },
          "hh:mm:ss.uu": function (seconds) {
              return clockFormat(seconds, 2);   
          },
          "hh:mm:ss.uuu": function (seconds) {
              return clockFormat(seconds, 3);   
          }
        };
      
        return formats[format];
    }, [format]);

    const updateSelect = useCallback((start, end) => {
        if (start < end) {
            document.querySelector('.btn-trim-audio').classList.remove('disabled');
        }else {
            document.querySelector('.btn-trim-audio').classList.add('disabled');
        }      
        document.querySelector('.audio-start').value = cueFormatters(format)(start);
        document.querySelector('.audio-end').value = cueFormatters(format)(end);

        UpdateStartTime(start);
        UpdateEndTime(end);
    }, [format, UpdateStartTime, UpdateEndTime, cueFormatters]);

    const muteTrack = (track) => {
        UpdateAudioStatus("Mute button pressed for " + track.name);
    };
    const seektTimeHandler = () => {
        var time = parseInt(seekTime, 10);
        ee.emit("select", time, time);
    };
    const timeFormatHandler = (e) => {
        const formatValue = e.target.value;
        ee.emit("durationformat", formatValue);
        UpdateFormat(formatValue);
        updateSelect(startTime, endTime, formatValue);
        UpdateAudioPos(audioPos);
    };
    const displayDownloadLink = (link) => {
        let dateString = (new Date()).toISOString();
        let $link = document.createElement("a");
        $link.href = link;
        $link.download = 'waveformplaylist' + dateString + '.wav';
        $link.text = 'Download mix ' + dateString;
        $link.className = 'btn btn-small btn-download-link';
        if(document.querySelector('.btn-download-link')){
            document.querySelector('.btn-download-link').remove();
        }
        document.querySelector('.btn-download').parentElement.appendChild($link);
    }
    const masterGain = (e) => {
        ee.emit("mastervolumechange", e.target.value);
    };
    const speedUpdateHandler = (e) => {
        const speed = e.target.value;
        UpdatePlaybackSpeed(speed);
        ee.emit("speedchange", speed);
    }

    useEffect(() => {
        /*
        * Code below receives updates from the playlist.
        */

        ee.on("select", updateSelect);
        ee.on("timeupdate", UpdateAudioPos);
        ee.on("mute", muteTrack);
        
        ee.on("solo", function(track) {
            UpdateAudioStatus("Solo button pressed for " + track.name);
        });
        
        ee.on("volumechange", function(volume, track) {
            UpdateAudioStatus(track.name + " now has volume " + volume + ".");
        });
        
        ee.on("mastervolumechange", function(volume) {
            UpdateAudioStatus("Master volume now has volume " + volume + ".");
        });
           
        ee.on('audiorenderingfinished', function (type, data) {
            if (type === 'wav'){
                let downloadUrl = window.URL.createObjectURL(data);
                displayDownloadLink(downloadUrl);
            }
        });

        return () => {
            ee.off("select", updateSelect);
            ee.off("timeupdate", UpdateAudioPos);
            ee.off("mute", muteTrack);
            ee.off("solo", function(track) {
                UpdateAudioStatus("Solo button pressed for " + track.name);
            });
        }
    }, [ee, updateSelect]);

    return (
        <div className="playlist-bottom-bar">
            <form className="form-inline">
                <select className="time-format form-control" onChange={e => timeFormatHandler(e)}>
                <option value="seconds" selected="selected">seconds</option>
                <option value="thousandths">thousandths</option>
                <option value="hh:mm:ss">hh:mm:ss</option>
                <option value="hh:mm:ss.u">hh:mm:ss + tenths</option>
                <option value="hh:mm:ss.uu">hh:mm:ss + hundredths</option>
                <option value="hh:mm:ss.uuu" >hh:mm:ss + milliseconds</option>
                </select>
                <input type="text" className="audio-start input-small form-control" />
                <input type="text" className="audio-end form-control" />
                <label className="audio-pos">{cueFormatters(format)(audioPos)}</label>
            </form>
            <form className="form-inline">
                <div className="form-group">
                    <label htmlFor="master-gain">Master Volume</label>
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        className="master-gain form-control" 
                        id="master-gain"
                        defaultValue="100" 
                        onChange={e => masterGain(e)}
                    />
                </div>
                <div className="sound-status">{audioStatus}</div>
            </form>
            <form className="form-inline">
                <div className="form-group">
                    <label htmlFor="master-gain">Speed change</label>
                    <input 
                        type="range" 
                        min="0.5" 
                        max="4" 
                        step="0.1"
                        className="master-gain form-control" 
                        id="master-gain"
                        defaultValue="1" 
                        onChange={e => speedUpdateHandler(e)}
                    />
                </div>
                <span className="playback-speed">{playbackSpeed}x</span>
            </form>
            <form className="form-inline">
                <div className="control-group">
                <label htmlFor="time">Seek to time :</label>
                <input type="number" className="form-control" id="seektime" defaultValue="0" onChange={e => UpdateSeekTime(e.target.value)}/>
                <span className="btn btn-primary btn-seektotime" onClick={seektTimeHandler}>Seek !</span>
                </div>
            </form>
        </div>
    )
}

export default PlayerFooter;