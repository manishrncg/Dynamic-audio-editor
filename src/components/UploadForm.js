import React from 'react';

import '../static/css/form.scss';

const Home = props => {
    const {updateInputValue, playlist} = props;
    // retrieves the event emitter the playlist is using.
    const ee = playlist && playlist.getEventEmitter();
    //track drop
    const dragLeaveHandler = (e) => {
      e.preventDefault();
      e.target.classList.remove("drag-enter");
    };
    const dragEnterHandler = (e) => {
        e.preventDefault();
        e.target.classList.add("drag-enter");
    };
    const dragOverHandler = (e) => {
      e.preventDefault();
    };
    const dropHandler = (e) => {
      e.preventDefault();
      e.target.classList.remove("drag-enter");
      for (var i = 0; i < e.dataTransfer.files.length; i++) {
        ee.emit("newtrack", e.dataTransfer.files[i]);
      }
    };

    return (
        <div className="upload-form-container text-center">            
            <h4 className="heading">Upload audio files</h4>
            <div className="input-container parent-for-center-div">
                <input 
                    type="file" 
                    className="input audio" 
                    onChange={e => updateInputValue(e)}
                    multiple={true}
                />
            </div>
            <div className="parent-for-center-div or">
                <span>OR</span>
            </div>
            <div 
              className="track-drop parent-for-center-div" 
              draggable={true} 
              onDragStart={e => dragEnterHandler} 
              onDragOver={e => dragOverHandler(e)}
              onDragEnd={e => dragLeaveHandler(e)}
              onDrop={e => dropHandler(e)}
            ></div>
        </div>
    )
}

export default Home;