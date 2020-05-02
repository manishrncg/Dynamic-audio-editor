import React, {useState, useEffect} from 'react';
import $ from "jquery";

const PlayerFooter = props => {
    const {playlist} = props;
    const [seekTime, UpdateSeekTime] = useState();
    let audioPos = 0, startTime = 0, endTime = 0;
    let downloadUrl = undefined;
    // const [isLooping, updateLooping] = useState(false);
    // retrieves the event emitter the playlist is using.
    const ee = playlist && playlist.getEventEmitter();
    const cueFormatters = format => {
        function clockFormat(seconds, decimals) {
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
    };
    const updateSelect = (start, end, format) => {
        if (start < end) {
            document.querySelector('.btn-trim-audio').classList.remove('disabled');
            document.querySelector('.btn-loop').classList.remove('disabled');
        }else {
            document.querySelector('.btn-trim-audio').classList.add('disabled');
            document.querySelector('.btn-loop').classList.add('disabled');
        }      
        document.querySelector('.audio-start').val(cueFormatters(format)(start));
        document.querySelector('.audio-end').val(cueFormatters(format)(end));
      
        startTime = start;
        endTime = end;
    };
    const updateTime = (time, format) => {
        document.querySelector('.audio-pos').innerHTML = cueFormatters(format)(time);
        audioPos = time;
    };
    const seektTimeHandler = () => {
        var time = parseInt(seekTime, 10);
        ee.emit("select", time, time);
    };
    const timeFormatHandler = (e) => {
        const formatValue = e.target.value;
        ee.emit("durationformat", formatValue);
      
        updateSelect(startTime, endTime, formatValue);
        updateTime(audioPos, formatValue);
    };
    function displayDownloadLink(link) {
        var dateString = (new Date()).toISOString();
        var $link = $("<a/>", {
          'href': link,
          'download': 'waveformplaylist' + dateString + '.wav',
          'text': 'Download mix ' + dateString,
          'class': 'btn btn-small btn-download-link'
        });
      
        $('.btn-download-link').remove();
        $('.btn-download').after($link);
    }

    useEffect(() => {
        /*
        * Code below receives updates from the playlist.
        */
        function displaySoundStatus(status) {
            document.querySelector(".sound-status").innerHTML = status;
        }
        
        // function displayLoadingData(data) {
        //     var info = $("<div/>").append(data);
        //     // document.querySelector(".loading-data").append(info);
        // }
        ee.on("select", updateSelect);
        
        ee.on("timeupdate", updateTime);
        
        ee.on("mute", function(track) {
            displaySoundStatus("Mute button pressed for " + track.name);
        });
        
        ee.on("solo", function(track) {
            displaySoundStatus("Solo button pressed for " + track.name);
        });
        
        ee.on("volumechange", function(volume, track) {
            displaySoundStatus(track.name + " now has volume " + volume + ".");
        });
        
        ee.on("mastervolumechange", function(volume) {
            displaySoundStatus("Master volume now has volume " + volume + ".");
        });
        
        
        var audioStates = ["uninitialized", "loading", "decoding", "finished"];
        
        ee.on("audiorequeststatechange", function(state, src) {
            var name = src;
        
            if (src instanceof File) {
            name = src.name;
            }
        
            // displayLoadingData("Track " + name + " is in state " + audioStates[state]);
        });
        
        ee.on("loadprogress", function(percent, src) {
            var name = src;
        
            if (src instanceof File) {
            name = src.name;
            }
        
            // displayLoadingData("Track " + name + " has loaded " + percent + "%");
        });
        
        // ee.on("audiosourcesloaded", function() {
        //   displayLoadingData("Tracks have all finished decoding.");
        // });
        
        // ee.on("audiosourcesrendered", function() {
        //   displayLoadingData("Tracks have been rendered");
        // });
           
        ee.on('audiorenderingfinished', function (type, data) {
            if (type === 'wav'){
                if (downloadUrl) {
                    window.URL.revokeObjectURL(downloadUrl);
                }
            
                downloadUrl = window.URL.createObjectURL(data);
                displayDownloadLink(downloadUrl);
            }
        });
    }, [playlist, ee]);

    return (
        <div className="playlist-bottom-bar">
            <div class="sound-status"></div>
            <form className="form-inline">
                <select className="time-format form-control" onChange={e => timeFormatHandler}>
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
                <input type="range" min="0" max="100" defaultValue="100" className="master-gain form-control" id="master-gain"/>
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
                <input type="number" className="form-control" id="seektime" defaultValue="0" onChange={e => UpdateSeekTime(e.target.value)}/>
                <span className="btn btn-primary btn-seektotime" onClick={seektTimeHandler}>Seek !</span>
                </div>
            </form>
        </div>
    )
}

export default PlayerFooter;