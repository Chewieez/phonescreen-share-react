import React, { Component } from 'react';
import './App.css';
import firebase from './fire';
import FileUploader from 'react-firebase-file-uploader';


class ProfilePage extends Component {
    state = {
        screenshot: '',
        isUploading: false,
        progress: 0,
        screenshotURL: []
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
                // update state by first getting previous state, and using spread operator, add new item to array.
                this.setState(previousState => ({
                    screenshotURL: [...previousState.screenshotURL, url]
                }));
            });
    };
    render() {
        // format jsx for each img in the array of screenshots.
        // replace this code with the spread operator in the return function below

        // const screenshotIMGs = this.state.screenshotURL.map((item, i) => 
        //     <div key={i}>
        //         <img src={item} alt=""/>
        //     </div>
        // );


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
                        randomizeFilename
                        storageRef={firebase.storage().ref('images')}
                        onUploadStart={this.handleUploadStart}
                        onUploadError={this.handleUploadError}
                        onUploadSuccess={this.handleUploadSuccess}
                        onProgress={this.handleProgress}
                    />
                </form>

                <div className="Screenshot-Display">
                {/* use spread operator to iterate over the array of screenshots and format jsx */}
                    {[...this.state.screenshotURL].map((item, i) =>
                        <div key={i.toString()}>
                            <img src={item} alt="" />
                        </div>
                    )}
                </div>

            </div>
        );
    }
}
export default ProfilePage;







// class App extends Component {
//     constructor(props) {
//         super(props);
//         this.state = { messages: [] };
//     }

//     handleSubmit = (event) => {
//         event.preventDefault();
//     }

//     componentWillMount() {
//         /* Create reference to messages in Firebase Database */
//         let messagesRef = fire.database().ref('messages').orderByKey().limitToLast(100);

//         messagesRef.on('child_added', snapshot => {
//             /* Update React state when message is added at Firebase Database */
//             let message = { text: snapshot.val(), id: snapshot.key };
//             this.setState({ messages: [message].concat(this.state.messages) });
//         })
//     }

//     addMessage = (e) =>{
//         e.preventDefault(); // <- prevent form submit from reloading the page
//         /* Send the message to Firebase */
//         fire.database().ref('messages').push( this.inputEl.value );
//         this.inputEl.value = ''; // <- clear the input
//       }

//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>

//         {/* <form onSubmit={this.handleSubmit}>
//             <label>
//             Upload file:
//             <input type="file" ref={input => {
//                 this.fileInput = input;
//                 }} />
//             </label>
//             <br />
//             <button type="submit">Submit</button>
//         </form> */}

//         <form onSubmit={this.addMessage}>
//             <input type="text" ref={ el => this.inputEl = el }/>
//             <input type="submit"/>
//             <ul>
//             { /* Render the list of messages */
//                 this.state.messages.map( message => <li key={message.id}>{message.text}</li> )
//             }
//             </ul>
//         </form>

//         {/* <p>{this.fileInput} </p> */}

//       </div>
//     );
//   }
// }

// export default App;
