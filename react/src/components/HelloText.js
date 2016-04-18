// Import React and JS
import React, { Component } from 'react';
import { render } from 'react-dom';

// Create class called HelloText that extends the base React Component class
export default class HelloText extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <p>你好, {this.props.name}!</p>;
	}
}
