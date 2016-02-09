import React, {Component} from 'react';
import Helmet from 'react-helmet';
import { MiniInfoBar } from 'components';
import { Well } from 'react-bootstrap';

export default class About extends Component {
  state = {
  };

  render() {
    const styles = require('./About.scss');
    return (
      <div className={styles.about}>
        <div className="container">
          <div className="window aboutWindow center-block">
            <div className="panel">
              <div className="panel-header"><div className="panel-title"><h3>About</h3></div></div>
              <div className="panel-body">
                <Well>
                  <h1>About</h1>
                  <Helmet title="About"/>
                  <MiniInfoBar/>
                </Well>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
