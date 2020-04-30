import React, {useState} from 'react';
import PageContainer from './common/PageContainer';
import UploadForm from './UploadForm.js';
import AudioPlayer from './AudioPlayer/index.js';

const Home = () => {
    const [inputFiles, setFileValue] = useState([]);
    const updateFile = event => {
        setFileValue(event.target.files);
    }
    return (
        <PageContainer componentClass="home">
            <h2 className="text-center">Dynamic Audio Editor</h2>
            <AudioPlayer filesArr={inputFiles} />
            <UploadForm inputValue={inputFiles} updateInputValue={updateFile} />                  
        </PageContainer>
    )
}

export default Home;