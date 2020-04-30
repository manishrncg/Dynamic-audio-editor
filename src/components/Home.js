import React, {useState} from 'react';
import PageContainer from './common/PageContainer';
import UploadForm from './UploadForm.js';
import AudioPlayer from './AudioPlayer.js';

const Home = () => {
    const [inputFiles, setFileValue] = useState();
    const updateFile = event => {
        setFileValue(event.target.files);
    }
    return (
        <PageContainer componentClass="home">
            <UploadForm inputValue={inputFiles} updateInputValue={updateFile} />
            {
                inputFiles &&
                <AudioPlayer inputFiles={inputFiles} />
            }
        </PageContainer>
    )
}

export default Home;