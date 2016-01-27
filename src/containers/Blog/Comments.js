import React, { Component } from 'react';
import DisqusThread from 'react-disqus-thread';

export default class Comments extends Component {
  handleNewComment = (comment) => {
    /* eslint no-console:0 */
    console.log(comment);
  }

  render() {
    return (
      <div>
        <h1>Comments</h1>
        <DisqusThread
          shortname="robberthalff"
          identifier="robberthalff"
          title="RobbertHalff Comments"
          onNewComment={this.handleNewComment}
        />
      </div>
    );
  }
}
