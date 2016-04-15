import angular from 'angular';
import uirouter from 'angular-ui-router';

import './assets/css/base.css';
import './assets/css/page.css';
import './assets/css/a.scss';
import './assets/css/b.less';

class AppCtrl {
  constructor () {
    this.title = 'hello world!';
    this.url = 'https://github.com/preboot/angular-webpack';
  }
}

const MODULE_NAME = 'darwin.app';

angular.module(MODULE_NAME, [uirouter])
  .controller('AppCtrl', AppCtrl);
