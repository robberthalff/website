// import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {load as loadPost } from 'redux/modules/content/post';
import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {Well, Thumbnail, Row, Col} from 'react-bootstrap';
import Comments from './Comments';
import Categories from './Categories';
import marked from 'marked';
import hjs from 'highlight.js';

import 'highlight.js/styles/monokai-sublime.css';

marked.setOptions({
  langPrefix: 'hljs ',
  highlight: (code) => hjs.highlightAuto(code).value
});

@connect(
  state => ({
    post: state.post.data
  }),
  dispatch => bindActionCreators({
    loadPost: loadPost
  }, dispatch))
export default class BlogPost extends Component {
  static propTypes = {
    post: PropTypes.object,
    params: PropTypes.object,
    loadPost: PropTypes.func.isRequired
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

  renderBlogPost = () => {
    const item = this.props.post;
    if (item) {
      return (
        <article className="media">
          <Row>
            <Col xs={2} md={2}>
              {this.renderThumbnail(item)}
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
    const styles = require('./Post.scss');
    const {post = {}} = this.props;
    return (
      <div className={styles.blogPost}>
        <div className="container">
          <Helmet title={post.name}/>
          <Row>
            <Col xs={8} md={8}>
              <Well>
              <div className="blog">
                {this.renderBlogPost()}
              </div>
              </Well>
            </Col>
            <Col xs={4} md={4}>
              <Categories />
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
