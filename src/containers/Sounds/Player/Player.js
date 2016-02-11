import React, {Component, PropTypes} from 'react';
import {
  ButtonToolbar,
// Button,
  Thumbnail,
  Col,
  Row,
  Grid
//  Panel
} from 'react-bootstrap';
import {
  PlayButton,
  PrevButton,
  NextButton,
  Progress,
  Timer
} from 'react-soundplayer/components';

import defaultImage from '../default.jpg';

export default class Player extends Component {
  static propTypes = {
    currentTime: PropTypes.number,
    playlist: PropTypes.shape({}),
    duration: PropTypes.number,
    soundCloudAudio: PropTypes.func
  }

  constructor() {
    super();

    this.state = {
      activeIndex: 0,
      playing: false
    };
  }

  playTrackAtIndex(playlistIndex) {
    const { soundCloudAudio } = this.props;
    const { playing } = this.state;
    if (playing && playlistIndex === this.state.activeIndex) {
      soundCloudAudio.stop({playlistIndex});
      this.setState({playing: false});
    } else {
      this.setState({
        activeIndex: playlistIndex,
        playing: true
      });
      soundCloudAudio.play({ playlistIndex });
    }
  }

  nextIndex() {
    let { activeIndex } = this.state;
    const { playlist } = this.props;
    if (activeIndex >= playlist.tracks.length - 1) {
      return;
    }
    if (activeIndex || activeIndex === 0) {
      this.setState({activeIndex: ++activeIndex});
    }
  }

  prevIndex() {
    let { activeIndex } = this.state;
    if (activeIndex <= 0) {
      return;
    }
    if (activeIndex || activeIndex === 0) {
      this.setState({activeIndex: --activeIndex});
    }
  }

  renderTrackList() {
    const { playlist, currentTime } = this.props;

    if (!playlist) {
      return <div>Loading...</div>;
    }

    const tracks = playlist.tracks.map((track, nr) => {
      const progress = (currentTime / track.duration * 100000);
      const style = {
        backgroundImage: `url(${track.waveform_url})`
      };
      if (nr === this.state.activeIndex) {
        style.backgroundPosition = `${progress}% ${progress + 1}%`;
      }
      return (
        <Col xs={3} md={3}>
          <Thumbnail
            style={style}
            key={track.id}
            src={track.artwork_url || defaultImage}
            onClick={this.playTrackAtIndex.bind(this, nr)}
            alt="242x200">
            <h3>{track.title}</h3>
            <span className="">{Timer.prettyTime(track.duration / 1000)}</span>
            <p>{track.description}</p>
          </Thumbnail>
        </Col>
      );
    });

    return (
      <Row>{tracks}</Row>
    );
  }

  renderControls = () => {
    const { currentTime, duration } = this.props;
    // TODO: very unoptimal rendering all is re-evaluated because of currentTime
    //       and probably also because of this.props.soundCloudPlayer
    return (
      <div className="">
        <div className="">
          <Timer className="h6 mr1 regular" duration={duration || 0} currentTime={currentTime} />
        </div>
        <Progress
          className="btn mt1 mb1 rounded"
          innerClassName="rounded-left"
          value={currentTime / duration * 100 || 0}
          {...this.props}
        />
        <ButtonToolbar>
          <PrevButton
            className="btn btn-default btn-xs"
            onPrevClick={this.prevIndex.bind(this)}
            {...this.props}
          />
          <PlayButton
            className="btn btn-default btn-xs"
            {...this.props}
          />
          <NextButton
            className="btn btn-default btn-xs"
            onNextClick={this.nextIndex.bind(this)}
            {...this.props}
          />
        </ButtonToolbar>
      </div>
    );
  }

  render() {
    // const styles = require('./Player.scss');
    return (
      <div className="">
        {this.renderControls()}
        <hr />
        <Grid>
          {this.renderTrackList()}
        </Grid>
      </div>
    );
  }
}
