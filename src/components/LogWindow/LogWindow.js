import React, { Component, PropTypes } from 'react';
// import {Panel} from 'react-bootstrap';
import io from 'socket.io-client';

export default class LogWindow extends Component {
  static propTypes = {
    // messages: PropTypes.array.isRequired,
    socket: PropTypes.object
  };
  /*
  static defaultProps = {
    messages: []
  };
  */
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  }
  componentDidMount() {
    const initSocket = () => {
      const socket = io('', {path: '/ws'});
      socket.on('news', (data) => {
        console.log(data);
        socket.emit('my other event', { my: 'data from client' });
      });
      socket.on('msg', (data) => {
        console.log(data);
      });

      return socket;
    };

    // pass as prop later from the container.
    this.socket = initSocket();
    this.socket.on('msg', msg => this.setState({messages: [msg].concat(this.state.messages)}));
  }

  renderMessages = () => {
    if (this.state) {
      return this.state.messages.map((msg) => {
        return (
          <p>{msg.ip} {msg.time} {msg.statusCode} {msg.ua} {msg.method} {msg.path}</p>
        );
      });
    }
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
