import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {load as loadPosts } from 'redux/modules/content/posts';
import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {Well, Thumbnail, Row, Col, Pagination} from 'react-bootstrap';
import {Link} from 'react-router';
import marked from 'marked';
import Categories from './Categories';

@connect(
  state => ({
    posts: state.posts.data
  }),
  dispatch => bindActionCreators({
    loadPosts: loadPosts
  }, dispatch))
export default class Blog extends Component {
  static propTypes = {
    posts: PropTypes.array,
    loadPosts: PropTypes.func.isRequired
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
  }

  renderThumbnail = (item) => {
    // src="http://res.cloudinary.com/keystone-demo/image/upload/c_fit,f_auto,h_80,w_80/v1453377461/owhisapu78fkfzkjouwr.png" />
    if (item.image) {
      return (
        <Thumbnail
          href={`/blog/post/${item.key}`}
          src={item.image.secure_url}
        />
      );
    }
    return null;
  }

  renderBlogPosts = () => {
    if (this.props.posts) {
      return this.props.posts.map((item, nr) => {
        return (
          <article className="media" key={nr}>
            <Row>
              <Col xs={2} md={2}>
                {this.renderThumbnail(item)}
              </Col>
              <Col xs={10} md={10}>
                <h3 className="media-heading"><Link to={`/blog/post/${item.key}/${item._id}`}>{item.name}</Link></h3>
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
    const styles = require('./Blog.scss');
    const logoImage = require('./logo.png');
    return (
      <div className={styles.blog}>
        <Helmet title="Blog"/>
        <div className={styles.masthead}>
          <div className="container">
            <h1>Blog</h1>
            <p>
              <img src={logoImage} />
            </p>
          </div>
        </div>
            <div className="container">
              <Well>
          <Row>
            <Col xs={8} md={8}>
              {this.renderShowing()}
              <div className="blog">
                {this.renderBlogPosts()}
              </div>
              {this.renderPagination()}
            </Col>
            <Col xs={4} md={4}>
              <Categories />
            </Col>
          </Row>
          <p>
            <button className="btn btn-primary" onClick={this.loadIt}>Reload from server</button>
          </p>
              </Well>
        </div>
      </div>
    );
  }
}
