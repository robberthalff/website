import React, {Component, PropTypes} from 'react';
// import { Link } from 'react-router';
import GithubRepository from './GithubRepository';
import Helmet from 'react-helmet';

export default class Projects extends Component {
  static propTypes = {
    projects: PropTypes.array
  };

  static defaultProps = {
    projects: [
      {username: 'rhalff', repository: 'dot-object'},
      {username: 'rhalff', repository: 'objenv'},
      {username: 'rhalff', repository: 'iffi'},
      {username: 'rhalff', repository: 'confert'},
      {username: 'rhalff', repository: 'diagres'},
      {username: 'rhalff', repository: 'dompointer'},
      {username: 'rhalff', repository: 'object-view'},
      {username: 'rhalff', repository: 'teflon'}
    ]
  };

  renderProjects() {
    if (this.props.projects) {
      return this.props.projects.map((project) => {
        return (
          <GithubRepository {...project} />
        );
      });
    }

    return (
      <p>No Projects loaded from Github</p>
    );
  }

  render() {
    const styles = require('./Projects.scss');
    return (
      <div className={styles.home}>
        <Helmet title="Home"/>
        <div className={styles.masthead}>
          <div className="container">
            <div className={styles.logo}>
              <p>
              </p>
            </div>
            <h1>Projects</h1>
            <p>
              <a className={styles.github} href="https://github.com/rhalff" target="_blank">
                <i className="fa fa-github"/> View on Github
              </a>
            </p>
          </div>
        </div>
        <div className="container">
          {this.renderProjects()}
        </div>
      </div>
    );
  }
}

