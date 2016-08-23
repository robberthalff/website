import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { SOCKETME_LOCATION } from 'redux/modules/socketme';

@connect(state => ({ location: state.socketme[SOCKETME_LOCATION] }))
export default class LocationBar extends Component {
  static propTypes = {
    location: PropTypes.array
  }

  static defaultProps = {
    location: []
  }

  renderLocation() {
    const { location } = this.props;
    return location.map((_location, nr) => {
      return (<strong key={nr}>{_location.latitude} {_location.longitude}</strong>);
    });
  }

  render() {
    const styles = require('./style.scss');
    return (
      <div className={styles.infoBar + ' well'}>
        <div className="container">
          {this.renderLocation()}
        </div>
      </div>
    );
  }
}
