import { combineReducers } from 'redux';
import multireducer from 'multireducer';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-async-connect';

import auth from './auth';
import counter from './counter';
import { reducer as form } from 'redux-form';
import info from './info';
import posts from './content/posts';
import post from './content/post';
import socketme from './socketme';
import categories from './content/categories';
import widgets from './widgets';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  auth,
  form,
  multireducer: multireducer({
    counter1: counter,
    counter2: counter,
    counter3: counter
  }),
  info,
  posts,
  post,
  socketme,
  categories,
  widgets
});
