import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { load as loadPosts } from 'redux/modules/content/posts';
import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { Well, Thumbnail, Row, Col, Pagination } from 'react-bootstrap';
import { Link } from 'react-router';
import marked from 'marked';
// import Categories from './Categories';
import moment from 'moment';

@connect(
  state => ({
    posts: state.posts.data
  }),
  dispatch => bindActionCreators({
    loadPosts
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
        <Col xs={2} md={2}>
          <Thumbnail
            href={`/blog/post/${item.key}/${item._id}`}
            src={item.image.secure_url}
          />
        </Col>
      );
    }
    return null;
  }

  renderBlogPosts = () => {
    if (this.props.posts) {
      return this.props.posts.map((item, nr) => {
        const colSize = item.image ? 10 : 12;
        console.log(item);
        if (item.content) {
          return (
            <article className="media" key={nr}>
              <Row>
                {this.renderThumbnail(item)}
                <Col xs={colSize} md={colSize}>
                  <h3 className="media-heading"><Link to={`/blog/post/${item.key}/${item._id}`}>{item.name}</Link></h3>
                  <p className="text-muted text-small">
                    <time>{moment().calendar(item.publishedDate)}</time>
                  </p>
                  <div dangerouslySetInnerHTML={{ __html: marked(item.content.brief.md) }} />
                </Col>
              </Row>
            </article>
          );
        }
      });
    }
    return (
      <p>No Blog Posts available.</p>
    );
  }

  renderShowing = () => {
    const { posts } = this.props;
    if (posts && posts.length > 10) {
      return (
        <div className="lead text-muted">Showing <strong>1</strong> to <strong>10</strong> of <strong>273</strong> posts</div>
      );
    }
    return null;
  }

  renderPagination = () => {
    const { posts } = this.props;
    if (posts && posts.length > 10) {
      return (
        <Pagination
          bsSize="small"
          items={10}
          activePage={this.state.activePage}
          onSelect={this.handleSelect}
        />
      );
    }
    return null;
  }

  render() {
    const styles = require('./Blog.scss');
    /*
    const logoImage = require('./logo.png');
    <p>
      <img src={logoImage} />
    </p>
     <div className={styles.masthead}>
     <div className="container">
     <h1>Blog</h1>
     </div>
     </div>
     <Categories />
    */
    console.log(styles);
    return (
      <div className={styles.blog}>
        <Helmet title="Blog" />
        <div className="container">
          <div className="window blogWindow center-block">
            <div className="panel">
              <div className="panel-header"><div className="panel-title"><h3>Weblog</h3></div></div>
              <div className="panel-body">
                <Well>
                  <Row>
                    <Col xs={8} md={8}>
                      {this.renderShowing()}
                      <div className="blog">
                        {this.renderBlogPosts()}
                      </div>
                      {this.renderPagination()}
                    </Col>
                    <Col xs={4} md={4} />
                  </Row>
                </Well>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
