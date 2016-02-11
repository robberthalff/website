import React, {Component, PropTypes} from 'react';
import {ButtonToolbar} from 'react-bootstrap';
import {
  PlayButton,
  PrevButton,
  NextButton,
  Progress,
  Timer
} from 'react-soundplayer/components';

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
      activeIndex: 0
    };
  }

  playTrackAtIndex(playlistIndex) {
    const { soundCloudAudio } = this.props;
    this.setState({activeIndex: playlistIndex});
    console.log('Playing', playlistIndex);
    soundCloudAudio.play({ playlistIndex });
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
    const { playlist } = this.props;

    if (!playlist) {
      return <div>Loading...</div>;
    }

    const tracks = playlist.tracks.map((track, nr) => {
      return (
        <button
          key={track.id}
          onClick={this.playTrackAtIndex.bind(this, nr)}
        >
          <span className="flex-auto semibold">{track.user.username} - {track.title}</span>
          <span className="h6 regular">{Timer.prettyTime(track.duration / 1000)}</span>
        </button>
      );
    });

    return (
      <div>{tracks}</div>
    );
  }

  renderControls = () => {
    const { currentTime, duration } = this.props;
    return (
      <div className="">
        <div className="">
          <Timer className="h6 mr1 regular" duration={duration || 0} currentTime={currentTime} />
        </div>
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
          <Progress
            className="mt1 mb1 rounded"
            innerClassName="rounded-left"
            value={currentTime / duration * 100 || 0}
            {...this.props}
          />
        </ButtonToolbar>
      </div>
    );
  }

  render() {
    const styles = require('./Player.scss');
    console.log(styles);
    return (
      <div className="">
        {this.renderControls()}
        {this.renderTrackList()}
      </div>
    );
  }
}
