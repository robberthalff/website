const LOG = 'log';

const initialState = {
  messages: []
};

const maxLength = 3;

export default function log(state = initialState, action = {}) {
  let messages = state.messages;
  if (state.messages.length > maxLength) {
    messages = state.messages.slice(
      state.messages.length - maxLength - 1
    );
  } else {
    messages = state.messages.slice();
  }
  messages.push(action.message);
  switch (action.type) {
    case LOG:
      return {
        ...state,
        messages
      };
    default:
      return state;
  }
}

export function addMessage(data) {
  return {
    type: LOG,
    message: data
  };
}

