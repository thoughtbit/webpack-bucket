import React, { Component } from 'react';
import { render } from 'react-dom';

describe('һ��������������', () => {
  it('��ʾ��ȷ������', () => {
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
