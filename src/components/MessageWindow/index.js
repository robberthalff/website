import React, { Component, PropTypes } from 'react';
import {Panel, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import classNames from 'classnames';
import {
  SOCKETME_MESSAGE,
  SOCKETME_CONNECTED,
  addMessage
} from 'redux/modules/socketme';

@connect(
  state => ({
    messages: state.socketme[SOCKETME_MESSAGE],
    connected: state.socketme[SOCKETME_CONNECTED]
  }),
  dispatch => bindActionCreators({addMessage}, dispatch))
export default class MessageWindow extends Component {
  static propTypes = {
    messages: PropTypes.array.isRequired,
    connected: PropTypes.array,
    addMessage: PropTypes.func.isRequired
  };

  static defaultProps = {
  }

  sendMessage = (ev) => {
    ev.preventDefault();
    const {message} = this.refs;
    if (message.value) {
      this.props.addMessage(SOCKETME_MESSAGE, {
        id: 1,
        sender: '@',
        message: message.value,
        createdAt: Date.now()
      });
    }
  }

  renderMessages = () => {
    const {messages} = this.props;
    return messages.map((msg, nr) => {
      return (
        <p key={nr}>{msg.message} {msg.createdAt}</p>
      );
    });
  }

  render() {
    const styles = require('./style.scss');
    const {connected} = this.props;
    const windowClass = classNames(
      'window',
      'messageWindow',
      {disabled: !connected[0]}
    );
    console.log('WINDOW CLASS', windowClass);
    return (
      <div className={windowClass}>
        <div className={styles.log}>
          <Panel header="Send Message">
            <div className={styles.window}>
              {this.renderMessages()}
            </div>
            <hr />
            <input ref="message" type="text" placeholder="write message..." />
            <Button
              type="submit"
              bsStyle="primary"
              bsSize="xsmall"
              onClick={this.sendMessage}>
              Send
            </Button>
          </Panel>
        </div>
      </div>
    );
  }
}
