import 'img/icon-128.png'//---> for the extension page
import 'img/icon-34.png'

import {createStore} from 'redux';
import rootReducer from './reducers';

import {wrapStore} from 'react-chrome-redux';

console.log('background on');

const store = createStore(rootReducer, {});

wrapStore(store, {
  portName: 'WORLD_DOMAINATION'
});



//only source of truth.. the background
