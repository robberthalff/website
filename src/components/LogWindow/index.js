import React, { Component, PropTypes } from 'react';
// import {Panel} from 'react-bootstrap';
import {connect} from 'react-redux';
import {SOCKETME_LOCATION} from 'redux/modules/socketme';

@connect(
  state => ({
    messages: state[SOCKETME_LOCATION]
  }))
export default class LogWindow extends Component {
  static propTypes = {
    messages: PropTypes.array.isRequired
  };

  static defaultProps = {
    messages: []
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
