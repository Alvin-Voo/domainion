import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import App from './components/app';
import {Store} from 'react-chrome-redux';
import {Provider} from 'react-redux';

const proxyStore = new Store({
  portName: 'WORLD_DOMAINATION'
});

proxyStore.ready().then(() => {
  ReactDOM.render(
     <Provider store={proxyStore}>
      <App />
     </Provider>
    ,document.querySelector('.container'));
});
