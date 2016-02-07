import React, { Component, PropTypes } from 'react';
// import {Panel} from 'react-bootstrap';
import io from 'socket.io-client';
import {addMessage} from 'redux/modules/socketme';
import {connect} from 'react-redux';

/*
import {
  // SOCKETME_BATTERY,
  // SOCKETME_MOTION,
  // SOCKETME_ORIENTATION
  // SOCKETME_SIGNAL,
  // SOCKETME_WIFI,
  SOCKETME_LOCATION
  // SOCKETME_DOPPLER,
} as Action from 'redux/modules/socketme';
*/

import * as SocketMe from 'redux/modules/socketme';

import {bindActionCreators} from 'redux';

@connect(
  state => ({
    messages: state[SocketMe.SOCKETME_LOCATION]
  }),
  dispatch => bindActionCreators({
    addMessage: addMessage
  }, dispatch))
export default class LogWindow extends Component {
  static propTypes = {
    messages: PropTypes.array.isRequired,
    socket: PropTypes.object,
    addMessage: PropTypes.func.isRequired
  };

  static defaultProps = {
    messages: []
  }

  componentDidMount() {
    this.socket = io('', {path: '/ws'});
    this.socket.on('msg', (data) => {
      this.adjustHeader(data.orientation);
      Object.keys(data).forEach((type) => {
        // only send last entry
        // LOG messages are in a different format skip for now
        if (Array.isArray(data[type])) {
          this.props.addMessage(SocketMe[`SOCKETME_${type.toUpperCase()}`], data[type].pop());
        } else {
          /*
          console.log('WHAT TYPE', type);
          this.props.addMessage(SocketMe[`SOCKETME_${type.toUpperCase()}`], data[type]);
          */
        }
      });
    });
  }

  adjustHeader = (data) => {
    if (data) {
      const first = data[0];
      if (first && first.accuracy) {
        console.log('first accuracy', first.accuracy);
      }
    }
  }

  renderMessages = () => {
    const {messages} = this.props;
    return messages.map((msg, nr) => {
      if (msg.ip) {
        return (
          <p key={nr}>{msg.ip} {msg.time} {msg.statusCode} {msg.ua} {msg.method} {msg.path}</p>
        );
      }
      const str = JSON.stringify(msg);
      return (
        <p key={nr}>{str}</p>
      );
    });
  }

  render() {
    const styles = require('./style.scss');
    return (
      <div className={styles.log}>
        {this.renderMessages()}
      </div>
    );
  }
}
