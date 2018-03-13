import React, { Component } from 'react';
import './App.css';


class DisplayMessages extends Component {

    constructor(props) {
        super(props)
    }


    render() {

        return (
            <div className="Messages-Display">
                
                {this.props.messages.map((item, i) =>
                    <div key={i.toString()}>
                        <p>{item}</p>
                    </div>
                )}
            </div>
        );
    }
}

export default DisplayMessages;