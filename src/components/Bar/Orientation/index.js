import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {SOCKETME_ORIENTATION} from 'redux/modules/socketme';

@connect( state => ({orientation: state.socketme[SOCKETME_ORIENTATION]}) )
export default class OrientationBar extends Component {
  static propTypes = {
    orientation: PropTypes.array
  }

  static defaultProps = {
    orientation: []
  }

  renderDevices() {
    const {orientation} = this.props;
    const _o = orientation.pop();
    if (_o) {
      // magneticHeading, trueHeading, accuracy, timeStamp
      return (<strong>{_o.magneticHeading}</strong>);
    }
  }

  render() {
    const styles = require('./style.scss');
    return (
      <div className={styles.wifi + ' well'}>
        <div className="container">
          {this.renderDevices()}
        </div>
      </div>
    );
  }
}
