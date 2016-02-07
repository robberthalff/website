export const SOCKETME_BATTERY = 'SocketMe/battery';
export const SOCKETME_MOTION = 'SocketMe/motion';
export const SOCKETME_ORIENTATION = 'SocketMe/orientation';
export const SOCKETME_SIGNAL = 'SocketMe/signal';
export const SOCKETME_WIFI = 'SocketMe/wifi';
export const SOCKETME_LOCATION = 'SocketMe/location';
export const SOCKETME_DOPPLER = 'SocketMe/doppler';
export const SOCKETME_LOG = 'SocketMe/log';

console.log(
  SOCKETME_BATTERY,
  SOCKETME_MOTION,
  SOCKETME_ORIENTATION,
  SOCKETME_SIGNAL,
  SOCKETME_WIFI,
  SOCKETME_LOCATION,
  SOCKETME_DOPPLER,
  SOCKETME_LOG
);

const initialState = {
  [SOCKETME_BATTERY]: [],
  [SOCKETME_MOTION]: [],
  [SOCKETME_ORIENTATION]: [],
  [SOCKETME_SIGNAL]: [],
  [SOCKETME_WIFI]: [],
  [SOCKETME_LOCATION]: [],
  [SOCKETME_DOPPLER]: [],
  [SOCKETME_LOG]: []
};

const maxLength = 3;

const myKeys = Object.keys(initialState);

export default function socketme(state = initialState, action = {}) {
  let messages;
  if (myKeys.indexOf(action.type) >= 0) {
    const _messages = state[action.type];
    if (_messages.length > maxLength) {
      messages = _messages.slice(
        _messages.length - maxLength - 1
      );
    } else {
      messages = _messages.slice();
    }
    messages.push(action.message);
    return {
      ...state,
      [action.type]: messages
    };
  }
  return {
    ...state
  };
}

export function addMessage(type, data) {
  return {
    type: type,
    message: data
  };
}

