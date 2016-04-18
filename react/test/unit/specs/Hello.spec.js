import React, { Component } from 'react';
import { render } from 'react-dom';

describe('一个基本方法测试', () => {
  it('显示正确的内容', () => {
	/*class App extends Component {
	  render() {
	    return <h1>Hello World!</h1>;
	  }
	};
    render(<App/>, document.getElementById('app'));
    expect(querySelector('#app h1').textContent).to.contain('Hello World!');*/
    expect('Hello World!').to.contain('Hello World!');
  });
});
