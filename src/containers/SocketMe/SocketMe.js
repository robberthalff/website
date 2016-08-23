import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Well } from 'react-bootstrap';
import {
  SignalBar,
  LocationBar,
  WifiBar,
  OrientationBar
} from '../../components';

export default class SocketMe extends Component {
  state = {
  };

  render() {
    const styles = require('./SocketMe.scss');
    return (
      <div className={styles.about}>
        <div className="container">
          <Well>
            <h1>SocketMe</h1>
            <Helmet title="SocketMe" />
            <LocationBar />
            <WifiBar />
            <SignalBar />
            <OrientationBar />
          </Well>
        </div>
      </div>
    );
  }
}
