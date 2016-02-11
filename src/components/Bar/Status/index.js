import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';
import {SOCKETME_CONNECTED} from 'redux/modules/socketme';
import io from 'socket.io-client';
import * as SocketMe from 'redux/modules/socketme';
import {addMessage} from 'redux/modules/socketme';
import {bindActionCreators} from 'redux';

@connect( state => ({connected: state.socketme[SOCKETME_CONNECTED]}),
  dispatch => bindActionCreators({
    addMessage: addMessage
  }, dispatch))
export default class StatusBar extends Component {
  static propTypes = {
    connected: PropTypes.array,
    addMessage: PropTypes.func.isRequired
  }

  static defaultProps = {
    connected: []
  }

  componentDidMount() {
    this.socket = io('', {path: '/ws'});
    this.socket.on('msg', (data) => {
      // this.adjustHeader(data.orientation);
      Object.keys(data).forEach((type) => {
        // only send last entry
        const actionType = `SOCKETME_${type.toUpperCase()}`;
        if (SocketMe[actionType]) {
          if (Array.isArray(data[type])) {
            this.props.addMessage(SocketMe[actionType], data[type].pop());
          } else {
            this.props.addMessage(SocketMe[actionType], data[type]);
          }
        } else {
          console.log('Unknown action type %s', actionType);
        }
      });
    });
  }

  renderStatus() {
    const {connected} = this.props;
    if (connected && connected.length && connected[connected.length - 1] === true) {
      return (
        <Button bsSize="xsmall" bsStyle="success">Online</Button>
      );
    }
    return (
      <Button bsSize="xsmall" bsStyle="danger">Offline</Button>
    );
  }

  render() {
    // const styles = require('./style.scss');
    return this.renderStatus();
  }
}
