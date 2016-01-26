import React, {Component} from 'react';
import Helmet from 'react-helmet';
import { MiniInfoBar } from 'components';

export default class About extends Component {
  state = {
  };

  render() {
    return (
      <div className="container">
        <h1>About</h1>
        <Helmet title="About"/>
        <MiniInfoBar/>
      </div>
    );
  }
}
