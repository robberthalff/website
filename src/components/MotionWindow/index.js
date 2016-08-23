import React, { Component, PropTypes } from 'react';
import { Panel } from 'react-bootstrap';
import { connect } from 'react-redux';
import classNames from 'classnames';
import {
  SOCKETME_ORIENTATION,
  SOCKETME_CONNECTED
} from 'redux/modules/socketme';
import viz from './viz';
import THREE from 'three';

// THREE.ImageUtils.crossOrigin = '';

@connect(
  state => ({
    messages: state.socketme[SOCKETME_ORIENTATION],
    connected: state.socketme[SOCKETME_CONNECTED]
  }))

export default class MotionWindow extends Component {
  static propTypes = {
    messages: PropTypes.array.isRequired,
    connected: PropTypes.array
  };

  static defaultProps = {
  }

  componentDidMount() {
    this.animate = true;
    const container = this.refs.container;
    // this.viz = new viz.Surface(container);
    this.viz = new viz.Angel(container);
  }

  componentWillReceiveProps(nextProps) {
    const { messages } = nextProps;
    const params = messages[messages.length - 1];
    requestAnimationFrame(this.viz.update.bind(this, params));
  }

  componentWillUnmount() {
    this.animate = false;
  }

  render() {
    const styles = require('./style.scss');
    // const {connected} = this.props;
    const windowClass = classNames(
      'window',
      'motionWindow'
      // {disabled: !connected[0]}
    );
    return (
      <div className={windowClass}>
        <div className={styles.log}>
          <Panel header="Motion">
            <div ref="container" className={styles.canvas} />
          </Panel>
        </div>
      </div>
    );
  }
}
