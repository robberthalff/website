const MESSAGE = 'SocketMe/message';
export const SOCKETME_BATTERY = 'SocketMe/battery';
export const SOCKETME_MOTION = 'SocketMe/motion';
export const SOCKETME_ORIENTATION = 'SocketMe/orientation';
export const SOCKETME_SIGNAL = 'SocketMe/signal';
export const SOCKETME_WIFI = 'SocketMe/wifi';
export const SOCKETME_LOCATION = 'SocketMe/location';
export const SOCKETME_DOPPLER = 'SocketMe/doppler';

const initialState = {
  messages: []
};

const maxLength = 3;

export default function message(state = initialState, action = {}) {
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
    case MESSAGE:
      return {
        ...state,
        messages
      };
    default:
      return state;
  }
}

export function addMessage(type, data) {
  return {
    type: type,
    message: data
  };
}

