import React, { Component, PropTypes } from 'react';
// import { Link } from 'react-router';
import {LogWindow} from 'components';
import config from '../../config';
import {connect} from 'react-redux';
import {SOCKETME_ORIENTATION, SOCKETME_SIGNAL} from 'redux/modules/socketme';
import Helmet from 'react-helmet';
@connect(
  state => ({
    orientation: state.socketme[SOCKETME_ORIENTATION],
    signal: state.socketme[SOCKETME_SIGNAL]
  })
)
export default class Home extends Component {
  static propTypes = {
    orientation: PropTypes.array,
    signal: PropTypes.array
  }
  render() {
    const styles = require('./Home.scss');
    /*
     const {orientation, signal} = this.props;
     // require the logo image both from client and server
     const logoImage = require('./logo.png');
    const imgStyle = {};
    if (orientation.length) {
      const deg = Math.round(orientation.pop().magneticHeading);
      imgStyle.transform = `rotate(${deg}deg)`;
    }
    if (signal && signal.length) {
      imgStyle.width = ((100 + ((100 + signal.slice().pop().dBm) * 6))) + '%';
    }
     <div className={styles.logo}>
     <p>
     <img src={logoImage} style={imgStyle}/>
     </p>
     </div>
    */
    return (
      <div className={styles.home}>
        <Helmet title="Home"/>
        <div className={styles.masthead}>
          <div className="container">
            <h1>{config.app.title}</h1>
            <h2>{config.app.description}</h2>
            <p>
              <a className={styles.github} href="https://github.com/rhalff" target="_blank"> </a>
            </p>
          </div>
        </div>
        <div className="container">
          <LogWindow />
        </div>
      </div>
    );
  }
}
