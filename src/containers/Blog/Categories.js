import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {load as loadCategories } from 'redux/modules/content/categories';
import React, {Component, PropTypes} from 'react';
import { Panel } from 'react-bootstrap';
import {Link} from 'react-router';

@connect(
  state => ({
    categories: state.categories.data
  }),
  dispatch => bindActionCreators({
    loadCategories: loadCategories
  }, dispatch))
export default class Categories extends Component {
  static propTypes = {
    categories: PropTypes.array,
    loadCategories: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.loadIt();
  }

  loadIt = () => {
    this.props.loadCategories();
  }

  renderCategories = () => {
    if (this.props.categories) {
      return this.props.categories.map((item, nr) => {
        return (
          <li role="presentation" key={nr}>
            <Link to={`/blog/${item.key}`}>{item.name} <span className="badge pull-right">{item.count || 9999}</span></Link>
          </li>
        );
      });
    }
    return (
      <p>No Categories available.</p>
    );
  }

  render() {
    return (
      <Panel header="Categories">
          <ul className="nav nav-pills nav-stacked">
            <li><a href="/blog">All</a></li>
            {this.renderCategories()}
          </ul>
      </Panel>
    );
  }
}
