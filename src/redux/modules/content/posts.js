const LOAD = 'content/posts/LOAD';
const LOAD_SUCCESS = 'content/posts/LOAD_SUCCESS';
const LOAD_FAIL = 'content/posts/LOAD_FAIL';

const initialState = {
  loaded: false
};

export default function posts(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.posts && globalState.posts.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    contentApi: (client) => {
      console.log('ContentApi request to /post', client);
      return client.get('/api/post');
    }
  };
}
