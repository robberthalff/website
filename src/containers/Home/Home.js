import React, { Component } from 'react';
// import { Link } from 'react-router';
import {LogWindow} from 'components';
import config from '../../config';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
@connect(
  state => ({
    posts: state.posts.data
  })
)
export default class Home extends Component {
  render() {
    const styles = require('./Home.scss');
    // require the logo image both from client and server
    const logoImage = require('./logo.png');
    return (
      <div className={styles.home}>
        <Helmet title="Home"/>
        <div className={styles.masthead}>
          <div className="container">
            <div className={styles.logo}>
              <p>
                <img src={logoImage}/>
              </p>
            </div>
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
