/* eslint-disable no-underscore-dangle, global-require, react/jsx-filename-extension */

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './redux/create';
import ApiClient from './helpers/ApiClient';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect } from 'redux-async-connect';

import useScroll from 'scroll-behavior/lib/useStandardScroll';

import getRoutes from './routes';

const clients = {
  website: new ApiClient(null, {
    host: __API_WEBSITE_HOST__,
    port: __API_WEBSITE_PORT__,
    secure: !(__DEVELOPMENT__)
  }),
  content: new ApiClient(null, {
    host: __API_CONTENT_HOST__,
    port: __API_CONTENT_PORT__,
    secure: !(__DEVELOPMENT__)
  })
};

const _browserHistory = useScroll(() => browserHistory)();
const store = createStore(_browserHistory, clients, window.__data);
const history = syncHistoryWithStore(_browserHistory, store);

const dest = document.getElementById('content');

const component = (
  <Router render={(props) =>
    <ReduxAsyncConnect {...props} helpers={{clients}} filter={item => !item.deferred} />
  } history={history}>
    {getRoutes(store)}
  </Router>
);

ReactDOM.render(
  <Provider store={store} key="provider">
    {component}
  </Provider>,
  dest
);

if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger

  if (
    !dest ||
    !dest.firstChild ||
    !dest.firstChild.attributes ||
    !dest.firstChild.attributes['data-react-checksum']) {
    console.error(
      'Server-side React render discarded.' +
      'Make sure that your initial render does not contain any client-side code.'
    );
  }
}

if (__DEVTOOLS__ && !window.devToolsExtension) {
  const DevTools = require('./containers/DevTools/DevTools');

  ReactDOM.render(
    <Provider store={store} key="provider">
      <div>
        {component}
        <DevTools />
      </div>
    </Provider>,
    dest
  );
}
