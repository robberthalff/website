import React, { Component, PropTypes } from 'react';
import DisqusThread from './DisqusThread';
import { Well } from 'react-bootstrap';

export default class Comments extends Component {
  static propTypes = {
    item: PropTypes.object
  }

  render() {
    const { item } = this.props;
    return (
      <Well>
        <DisqusThread
          id={item._id}
          title={item.name}
          path={`/blog/post/${item.key}/${item._id}`}
        />
      </Well>
    );
  }
}
