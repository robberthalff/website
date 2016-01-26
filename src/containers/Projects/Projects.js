import React, {Component, PropTypes} from 'react';
// import { Link } from 'react-router';
import { GithubButton } from 'components';
import { Row } from 'react-bootstrap';
import Helmet from 'react-helmet';

export default class Projects extends Component {
  static propTypes = {
    projects: PropTypes.array
  };

  renderProjects() {
    if (this.props.projects) {
      return this.props.projects.map(() => {
        return (
          <Row>
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
          </Row>
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
