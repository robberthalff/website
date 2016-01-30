import React, { Component, PropTypes } from 'react';
// import {Panel} from 'react-bootstrap';
import io from 'socket.io-client';
import {addMessage} from 'redux/modules/log';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

@connect(
  state => ({
    messages: state.log.messages
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
    socket.on('msg', (data) => {
      this.adjustHeader(data.orientation);
      this.props.addMessage(data);
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
    const styles = require('./LogWindow.scss');
    return (
      <div className={styles.log}>
        {this.renderMessages()}
      </div>
    );
  }
}
