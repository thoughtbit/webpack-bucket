// Import React and JS
import React, { Component } from 'react';
import { render } from 'react-dom';
import HelloText from './HelloText';

// Create class called HelloBox that extends the base React Component class
export default class HelloBox extends Component {
    constructor() {
        super();
    }
    render() {
        return <div><HelloText name='世界' /></div>;
    }
}
