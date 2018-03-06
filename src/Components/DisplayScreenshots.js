import React, { Component } from 'react';import './App.css';


class DisplayScreenshots extends Component {

    render() {

        return (
            <div className="Screenshot-Display">
                {/* use spread operator to iterate over the array of screenshots and format jsx */}
                {[...this.props.screenshotURL].map((item, i) =>
                    <div key={i.toString()}>
                        <img src={item} alt="" />
                    </div>
                )}
            </div>
        );
    }
}

export default DisplayScreenshots;