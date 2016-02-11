// import {bindActionCreators} from 'redux';
// import {connect} from 'react-redux';
// import {load as loadSounds } from 'redux/modules/content/sounds';
import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {Well, Row, Col} from 'react-bootstrap';
import { SoundPlayerContainer } from 'react-soundplayer/addons';
import Player from './Player/Player';
const clientId = '0d35c7e491d8eff85a353a22baa5b15e';
const playListUrl = 'https://soundcloud.com/rob-halff/sets/robberthalff';

export default class Sounds extends Component {
  static propTypes = {
    sounds: PropTypes.array.isRequired
  }

  static defaultProps = {
  }

  render() {
    const styles = require('./Sounds.scss');
    return (
      <div className={styles.blog}>
        <Helmet title="SoundLog"/>
        <div className="window soundWindow center-block">
          <div className="panel">
            <div className="panel-header"><div className="panel-title"><h3>SoundLog</h3></div></div>
            <div className="panel-body">
              <Well>
                <p>
                  Things I record
                </p>
                <Row>
                  <Col xs={12} md={12}>
                    <div className="blog">
                      <SoundPlayerContainer resolveUrl={playListUrl} clientId={clientId}>
                        <Player />
                      </SoundPlayerContainer>
                    </div>
                  </Col>
                </Row>
              </Well>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
