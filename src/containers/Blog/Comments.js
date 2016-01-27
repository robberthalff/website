import React, { Component } from 'react';
import DisqusThread from 'react-disqus-thread';
import {Well} from 'react-bootstrap';

export default class Comments extends Component {
  handleNewComment = (comment) => {
    /* eslint no-console:0 */
    console.log(comment);
  }

  render() {
    return (
      <Well>
        <DisqusThread
          shortname="robberthalff"
          identifier="robberthalff"
          title="RobbertHalff Comments"
          onNewComment={this.handleNewComment}
        />
      </Well>
    );
  }
}
