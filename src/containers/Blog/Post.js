// import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {load as loadPost } from 'redux/modules/content/post';
import {load as loadCategories } from 'redux/modules/content/categories';
import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {Thumbnail, Row, Col} from 'react-bootstrap';
import Comments from './Comments';
import marked from 'marked';
import hjs from 'highlight.js';
import styles from './Post.scss';

import 'highlight.js/styles/monokai-sublime.css';

marked.setOptions({
  langPrefix: 'hljs ',
  highlight: (code) => hjs.highlightAuto(code).value
});

@connect(
  state => ({
    post: state.post.data,
    categories: state.categories.data
  }),
  dispatch => bindActionCreators({
    loadPost: loadPost,
    loadCategories: loadCategories
  }, dispatch))
export default class BlogPost extends Component {
  static propTypes = {
    post: PropTypes.object,
    params: PropTypes.object,
    categories: PropTypes.array,
    loadPost: PropTypes.func.isRequired,
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
    if (this.props.params.id) {
      this.props.loadPost(this.props.params.id);
    }
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
  renderBlogPost = () => {
    const item = this.props.post;
    if (item) {
      return (
        <article className="media">
          <Row>
            <Col xs={2} md={2}>
              <Thumbnail href={`/blog/post/${item.key}`} src="http://res.cloudinary.com/keystone-demo/image/upload/c_fit,f_auto,h_80,w_80/v1453377461/owhisapu78fkfzkjouwr.png" />
            </Col>
            <Col xs={10} md={10}>
              <h3 className="media-heading"><a href={`/blog/post/${item.key}`}>{item.name}</a></h3>
              <p className="text-muted text-small">
                <time>January 21st, 2016</time> <span>by A B</span>
              </p>
              <div dangerouslySetInnerHTML={{ __html: marked(item.content.extended.md) }} />
            </Col>
          </Row>
        </article>
      );
    }
    return (
      <p>Blog Post not available.</p>
    );
  }

  render() {
    const {post = {}} = this.props;
    return (
      <div className={styles.blogPost}>
        <div className="container">
          <h1>{post.name}</h1>
          <Helmet title={post.name}/>
          <Row>
            <Col xs={8} md={8}>
              <div className="blog">
                {this.renderBlogPost()}
              </div>
            </Col>
            <Col xs={4} md={4}>
              <div className="lead text-muted">Categories</div>
              <ul className="nav nav-pills nav-stacked">
                <li><a href="/blog">All</a></li>
                {this.renderCategories()}
              </ul>
            </Col>
          </Row>
          <Row>
            <Comments />
          </Row>
        </div>
      </div>
    );
  }
}
