import React, { Component, PropTypes } from 'react';
// import { Link } from 'react-router';
import GithubRepository from './GithubRepository';
import { Well } from 'react-bootstrap';
import Helmet from 'react-helmet';

export default class Projects extends Component {
  static propTypes = {
    projects: PropTypes.array
  };

  static defaultProps = {
    projects: [
      { username: 'rhalff', repository: 'dot-object' },
      { username: 'rhalff', repository: 'objenv' },
      { username: 'rhalff', repository: 'iffi' },
      { username: 'rhalff', repository: 'confert' },
      { username: 'rhalff', repository: 'diagres' },
      { username: 'rhalff', repository: 'dompointer' },
      { username: 'rhalff', repository: 'object-view' },
      { username: 'rhalff', repository: 'teflon' }
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
    /*
    <div className={styles.masthead}>
    </div>
    */
    return (
      <div className={styles.home}>
        <Helmet title="Home" />
        <div className="window projectsWindow center-block">
          <div className="panel">
            <div className="panel-header">
              <div className="panel-title">
                  <h1>SourceCode</h1>
                  <p>
                    <a className={styles.github} href="https://github.com/rhalff" target="_blank">
                      <i className="fa fa-github" /> View on Github
                    </a>
                  </p>
              </div>
            </div>
            <div className="panel-body">
              <Well className="clearfix">
                {this.renderProjects()}
              </Well>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

