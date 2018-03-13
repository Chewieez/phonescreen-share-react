import React, { Component } from 'react';
import './App.css';


class DisplayScreenshots extends Component {

    constructor(props) {
        super(props)
    }


    render() {

        return (
            <div className="Screenshot-Display">
                
                {this.props.screenshotURL.map((item, i) =>
                    <div key={i.toString()}>
                        <img src={item} alt="" />
                    </div>
                )}
            </div>
        );
    }
}

export default DisplayScreenshots;