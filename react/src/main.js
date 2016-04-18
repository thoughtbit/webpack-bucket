// Import React and JS
import React from 'react';
import { render } from 'react-dom';
import HelloBox from './components/HelloBox';

// Import CSS
import './assets/css/base.css';
import './assets/css/page.css';
import './assets/css/a.scss';
import './assets/css/b.less';

// Render!
render(<HelloBox />, document.getElementById('app'));
