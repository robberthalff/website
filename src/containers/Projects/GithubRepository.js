import React, { Component, PropTypes } from 'react';

const API_ROOT = 'https://api.github.com/repos';

export default class GithubRepository extends Component {
  static propTypes = {
    username: PropTypes.string.isRequired,
    repository: PropTypes.string.isRequired,
    showName: PropTypes.boolean,
    showUsername: PropTypes.boolean,
    showDescription: PropTypes.boolean,
    className: PropTypes.string
  }

  static defaultProps = {
    showName: true,
    showUsername: true,
    showDescription: true
  }

  state = {};

  componentDidMount() {
    async () => {
      const address = `${API_ROOT}/${this.props.username}/${this.props.repository}`;
      const response = await fetch(address);
      const json = await response.json();
      this.setState(json);
    }();
  }

  render() {
    const styles = require('./GithubRepository.scss');
    const ownerUrl = `https://github.com/${this.props.username}`;
    return (
      <div className={styles.repository}>
        {
          this.props.showName && <a href={this.state.html_url}><h2 className={styles.name}>{this.props.repository}</h2></a>
        }
        {
          this.props.showDescription && <h4 className={styles.description}>{this.state.description}</h4>
        }
        {
          this.props.showUsername && <h5>by <strong><a href={ownerUrl}>@{this.props.username}</a></strong></h5>
        }
        <ul className={styles.details}>
          <li className={styles.stars}><a href={`${this.state.html_url}/stargazers`}><strong>{this.state.stargazers_count}</strong> Stars</a></li>
          <li className={styles.forks}><a href={`${this.state.html_url}/network`}><strong>{this.state.forks_count}</strong> Forks</a></li>
          <li className={styles.language}><a href={`${this.state.html_url}/search?l=${this.state.language}`}><strong>{this.state.language}</strong> Language</a></li>
        </ul>
      </div>
    );
  }
}
