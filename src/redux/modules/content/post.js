const LOAD = 'content/post/LOAD';
const LOAD_SUCCESS = 'content/post/LOAD_SUCCESS';
const LOAD_FAIL = 'content/post/LOAD_FAIL';

const initialState = {
  loaded: false
};

export default function post(state = initialState, action = {}) {
  console.log('ACTION TYPE', action);
  console.log('POST STATE', state);
  switch (action.type) {
    case LOAD:
      console.log('CURRENT STATE', state);
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      console.log('IT LOADED!');
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case LOAD_FAIL:
      console.log('WE ARE FAILING', action, state);
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
  console.log('isLoaded', globalState.post);
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
