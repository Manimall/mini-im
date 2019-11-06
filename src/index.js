import './app.css'

import React from 'react'
import ReactDOM from 'react-dom'

import createSagaMiddleware from 'redux-saga';
import {applyMiddleware, createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import {Provider} from 'react-redux'

import {createBrowserHistory} from 'history'
import {routerMiddleware, ConnectedRouter} from 'connected-react-router'

// our own imports
import App from 'App'
import createRootReducer, {rootSaga} from 'modules'


const sagaMiddleware = createSagaMiddleware();
const history = createBrowserHistory();
const middlewares = [sagaMiddleware, routerMiddleware(history)];

const store = createStore(
  createRootReducer(history),
  composeWithDevTools(applyMiddleware(...middlewares))
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
