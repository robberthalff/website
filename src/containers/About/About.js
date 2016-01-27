import React, {Component} from 'react';
import Helmet from 'react-helmet';
import { MiniInfoBar } from 'components';
import { Well } from 'react-bootstrap';

export default class About extends Component {
  state = {
  };

  render() {
    return (
        <div className="container">
          <Well>
          <h1>About</h1>
          <Helmet title="About"/>
          <MiniInfoBar/>
          </Well>
        </div>
    );
  }
}
