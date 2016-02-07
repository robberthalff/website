import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {SOCKETME_SIGNAL} from 'redux/modules/socketme';

@connect( state => ({signal: state.socketme[SOCKETME_SIGNAL]}) )
export default class SignalBar extends Component {
  static propTypes = {
    signal: PropTypes.array
  }

  static defaultProps = {
    signal: []
  }

  renderSignals() {
    const {signal} = this.props;
    return signal.map((_signal, nr) => {
      return (<strong key={nr}>dBm: {_signal.dBm}</strong>);
    });
  }

  render() {
    const styles = require('./style.scss');
    return (
      <div className={styles.wifi + ' well'}>
        <div className="container">
          {this.renderSignals()}
        </div>
      </div>
    );
  }
}
