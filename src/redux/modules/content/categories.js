const LOAD = 'content/categories/LOAD';
const LOAD_SUCCESS = 'content/categories/LOAD_SUCCESS';
const LOAD_FAIL = 'content/categories/LOAD_FAIL';

const initialState = {
  loaded: false
};

export default function categories(state = initialState, action = {}) {
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
  return globalState.categories && globalState.categories.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    contentApi: (client) => {
      console.log('ContentApi request to /category', client);
      return client.get('/api/postcategory');
    }
  };
}
