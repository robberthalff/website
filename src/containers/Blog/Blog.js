// import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {load as loadPosts } from 'redux/modules/content/posts';
import {load as loadCategories } from 'redux/modules/content/categories';
import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {Thumbnail, Row, Col, Pagination} from 'react-bootstrap';
import marked from 'marked';
// import { MiniInfoBar } from 'components';

@connect(
  state => ({
    posts: state.posts.data,
    categories: state.categories.data
  }),
  dispatch => bindActionCreators({
    loadPosts: loadPosts,
    loadCategories: loadCategories
  }, dispatch))
export default class Blog extends Component {
  static propTypes = {
    posts: PropTypes.array,
    categories: PropTypes.array,
    loadPosts: PropTypes.func.isRequired,
    loadCategories: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.loadIt();
  }

  state = {
    activePage: 1
  }

  loadIt = () => {
    this.props.loadPosts();
    this.props.loadCategories();
  }

  renderCategories = () => {
    if (this.props.categories) {
      return this.props.categories.map((item, nr) => {
        return (
          <li role="presentation" key={nr}>
            <a href="/blog/{item.key}">{item.name} <span className="badge pull-right">{item.count || 9999}</span></a>
          </li>
        );
      });
    }
    return (
      <p>No Categories available.</p>
    );
  }
  renderBlogPosts = () => {
    if (this.props.posts) {
      return this.props.posts.map((item, nr) => {
        return (
          <article className="media" key={nr}>
            <Row>
              <Col xs={2} md={2}>
                <Thumbnail href={`/blog/post/${item.name}`} src="http://res.cloudinary.com/keystone-demo/image/upload/c_fit,f_auto,h_80,w_80/v1453377461/owhisapu78fkfzkjouwr.png" />
              </Col>
              <Col xs={10} md={10}>
                <h3 className="media-heading"><a href={`/blog/post/${item.name}`}>{item.name}</a></h3>
                <p className="text-muted text-small">
                  <time>January 21st, 2016</time> <span>by A B</span>
                </p>
                <div dangerouslySetInnerHTML={{ __html: marked(item.content.brief.md) }} />
              </Col>
            </Row>
          </article>
        );
      });
    }
    return (
      <p>No Blog Posts available.</p>
    );
  }

  renderShowing = () => {
    const {posts} = this.props;
    if (posts && posts.length > 10) {
      return (
        <div className="lead text-muted">Showing <strong>1</strong> to <strong>10</strong> of <strong>273</strong> posts</div>
      );
    }
    return null;
  }

  renderPagination = () => {
    const {posts} = this.props;
    if (posts && posts.length > 10) {
      return (
        <Pagination
        bsSize="small"
        items={10}
        activePage={this.state.activePage}
        onSelect={this.handleSelect} />
      );
    }
    return null;
  }

  render() {
    return (
      <div className="container">
        <h1>Blog</h1>
        <Helmet title="Blog"/>
        <p>
          <button className="btn btn-primary" onClick={this.loadIt}>Reload from server</button>
        </p>
        <Row>
          <Col xs={8} md={8}>
            {this.renderShowing()}
            <div className="blog">
              {this.renderBlogPosts()}
            </div>
            {this.renderPagination()}
          </Col>
          <Col xs={4} md={4}>
              <div className="lead text-muted">Categories</div>
              <ul className="nav nav-pills nav-stacked">
                <li><a href="/blog">All</a></li>
                {this.renderCategories()}
              </ul>
          </Col>
        </Row>
      </div>
    );
  }
}
