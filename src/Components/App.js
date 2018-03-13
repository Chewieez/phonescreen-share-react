import React, { Component } from 'react';
import './App.css';
import firebase from '../fire';
import DisplayScreenshots from './DisplayScreenshots';
import DisplayMessages from './DisplayMessages';
import UploadScreenshot from './UploadScreenshot';


class Dashboard extends Component {
    state = {
        screenshotURL: [],
        messages: [],
        remoteURL: "https://phonescreen-share.firebaseio.com/messages.json"
    };
    
    handleScreenshotUrls = (item) => {
        // put parenthesis around the object to be set in state, so that the code inside the brackets is not interpreted as a function to call, but as an object.
        this.setState(previousState => ({
            screenshotURL: [...previousState.screenshotURL, item]
        }));
    }

    handleMessages = (item) => {
        // put parenthesis around the object to be set in state, so that the code inside the brackets is not interpreted as a function to call, but as an object.
        this.setState(previousState => ({
            messages: [...previousState.messages, item]
        }));
    }


    componentDidMount() {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', this.state.remoteURL, true)
    
        xhr.onload = function() {
            let data = JSON.parse(xhr.responseText)
            // convert the returned data object into an array
            let messages = Object.keys(data)
            .map(key => {
                return data[key]
            })
            // iterate through the array of messages and send them to handleMessages to be added to state
            messages.forEach(m => this.handleMessages(m))
        }.bind(this)
    
        xhr.send()
    }


    render() {
        return (
            <div>
                <DisplayMessages messages={this.state.messages} />
                
                <UploadScreenshot passedScreenShotUrls={this.handleScreenshotUrls} />

                <DisplayScreenshots screenshotURL={this.state.screenshotURL} />
                
            </div>
        );
    }
}
export default Dashboard;







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
