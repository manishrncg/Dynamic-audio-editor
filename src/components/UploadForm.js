import React from 'react';

import '../static/css/form.scss';

const Home = props => {
    const {updateInputValue} = props;
    //track drop
    // $container.on("dragenter", ".track-drop", function(e) {
    //   e.preventDefault();
    //   e.target.classList.add("drag-enter");
    // });
    
    // $container.on("dragover", ".track-drop", function(e) {
    //   e.preventDefault();
    // });
    
    // $container.on("dragleave", ".track-drop", function(e) {
    //   e.preventDefault();
    //   e.target.classList.remove("drag-enter");
    // });
    
    // const trackDropped = (e) => {
    //   e.preventDefault();
    //   e.target.classList.remove("drag-enter");
    
    //   var dropEvent = e.originalEvent;
    
    //   for (var i = 0; i < dropEvent.dataTransfer.files.length; i++) {
    //     ee.emit("newtrack", dropEvent.dataTransfer.files[i]);
    //   }
    // };

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
            <div className="track-drop parent-for-center-div" ></div>
            {/* onClick={e => trackDropped(e)} */}
        </div>
    )
}

export default Home;