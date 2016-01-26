const LOAD = 'content/post/LOAD';
const LOAD_SUCCESS = 'content/post/LOAD_SUCCESS';
const LOAD_FAIL = 'content/post/LOAD_FAIL';

const initialState = {
  loaded: false
};

export default function post(state = initialState, action = {}) {
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
  return globalState.post && globalState.post.loaded;
}

export function load(id) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    contentApi: (client) => {
      console.log('ContentApi request to /post/:id', client);
      return client.get('/api/post/' + id);
    }
  };
}
