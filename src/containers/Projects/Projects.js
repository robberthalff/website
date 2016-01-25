import React, { Component } from 'react';
// import { Link } from 'react-router';
import { GithubButton } from 'components';
import config from '../../config';
import Helmet from 'react-helmet';

export default class Projects extends Component {
  render() {
    const styles = require('./Projects.scss');
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
              <a className={styles.github} href="https://github.com/rhalff" target="_blank">
                <i className="fa fa-github"/> View on Github
              </a>
            </p>
            <GithubButton user="rhalff"
                          repo="dot-object"
                          type="star"
                          width={160}
                          height={30}
                          count large/>
            <GithubButton user="rhalff"
                          repo="dot-object"
                          type="fork"
                          width={160}
                          height={30}
                          count large/>
          </div>
        </div>

        <div className="container">
          .... Projects
        </div>
      </div>
    );
  }
}
