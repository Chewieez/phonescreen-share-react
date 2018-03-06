import React, { Component } from 'react';
import './App.css';
import firebase from '../fire';
import FileUploader from 'react-firebase-file-uploader';


class UploadScreenshot extends Component {
    state = {
        screenshot: '',
        isUploading: false,
        progress: 0,
    };
    
    handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
    handleProgress = (progress) => this.setState({ progress });
    handleUploadError = (error) => {
        this.setState({ isUploading: false });
        console.error(error);
    }
    handleUploadSuccess = (filename) => {
        this.setState({ screenshot: filename, progress: 100, isUploading: false });
        firebase.storage().ref('images').child(filename).getDownloadURL()
            .then(url => {
                // pass the new url to the function in props that will set it to the (higher) state in the App.js. 
                this.props.passedScreenShotUrls(url);
            });
    };
    render() {

        return (
            <div>
                <form>
                    <label>Screenshot:</label>
                    {this.state.isUploading &&
                        <p>Progress: {this.state.progress}</p>
                    }
                    <FileUploader
                        accept="image/*"
                        name="screenshot"
                        // randomizeFilename
                        storageRef={firebase.storage().ref('images')}
                        onUploadStart={this.handleUploadStart}
                        onUploadError={this.handleUploadError}
                        onUploadSuccess={this.handleUploadSuccess}
                        onProgress={this.handleProgress}
                    />
                </form>
            </div>
        );
    }
}
export default UploadScreenshot;

