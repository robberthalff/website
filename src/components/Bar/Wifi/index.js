import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {SOCKETME_WIFI} from 'redux/modules/socketme';

@connect( state => ({devices: state.socketme[SOCKETME_WIFI]}) )
export default class WifiBar extends Component {
  static propTypes = {
    devices: PropTypes.array
  }

  static defaultProps = {
    devices: []
  }

  renderDevices() {
    const {devices} = this.props;
    return devices.map((_device, nr) => {
      return _device.map((_dev, _nr) => {
        // BSSID, SSID, level
        return (<strong key={nr + _nr}>{_dev.SSID} {_dev.level}</strong>);
      });
    });
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
