import React, { Component, PropTypes } from 'react';
import DisqusThread from 'react-disqus-thread';
import {Well} from 'react-bootstrap';

export default class Comments extends Component {
  static propTypes = {
    item: PropTypes.object
  }
  handleNewComment = (comment) => {
    /* eslint no-console:0 */
    console.log(comment);
  }

  render() {
    const {item} = this.props;
    return (
      <Well>
        <DisqusThread
          shortname="robberthalff"
          identifier={item.key}
          title={`${item.name} Comments`}
          url={window.location.href}
          onNewComment={this.handleNewComment}
        />
      </Well>
    );
  }
}
