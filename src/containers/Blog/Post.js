// import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { isLoaded, load as loadPost } from 'redux/modules/content/post';
import * as postActions from 'redux/modules/content/post';
import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import moment from 'moment';
import { Thumbnail, Row, Col } from 'react-bootstrap';
import Comments from './Comments';
// import Categories from './Categories';
import marked from 'marked';
import hjs from 'highlight.js';
import { asyncConnect } from 'redux-async-connect';

import 'highlight.js/styles/monokai-sublime.css';

marked.setOptions({
  langPrefix: 'hljs ',
  highlight: (code) => hjs.highlightAuto(code).value
});

@asyncConnect([{
  deferred: true,
  promise: ({ store: { dispatch, getState } }) => {
    const state = getState();
    if (!isLoaded(state)) {
      return dispatch(loadPost());
    }
  }
}])

@connect(
  state => {
    const post = state.post.data;
    const meta = [];
    if (post) {
      meta.concat([
        { name: 'description', content: post.content.brief.md },
        { property: 'og:type', content: 'article' },
        { property: 'og:title', content: post.name },
        { property: 'og:description', content: post.content.brief.md }
      ]);
      if (post.image) {
        meta.push({ property: 'og:image', content: post.image.secure_url });
        meta.push({ property: 'og:image:width', content: post.image.width });
        meta.push({ property: 'og:image:height', content: post.image.height });
      }
    }
    return {
      post,
      meta
    };
  },
  { ...postActions }
)
/*
  dispatch => bindActionCreators({
    loadPost: loadPost
  }, dispatch))
*/
export default class BlogPost extends Component {
  static propTypes = {
    post: PropTypes.object,
    meta: PropTypes.array,
    params: PropTypes.object,
    load: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    // this.loadIt();
  }

  state = {
    activePage: 1
  }
/*
  loadIt = () => {
    if (this.props.params.id) {
      this.props.load(this.props.params.id);
    }
  }
*/

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
    console.log('already rendering post');
    if (item) {
      console.log(item);
      const time = moment(item.publishedDate).format('dddd, MMMM Do YYYY');
      return (
        <div className="window blogWindow center-block">
          <div className="panel">
            <div className="panel-header">
              <div className="panel-title">
                <h3>{item.name}</h3>
                <time>{time}</time>
              </div>
              <div className="panel-body">
                <article className="media">
                  <Row>
                    <Col xs={12} md={12}>
                      <p className="text-muted text-small">
                      </p>
                      {this.renderThumbnail(item)}
                      <div dangerouslySetInnerHTML={{ __html: marked(item.content.extended.md) }} />
                    </Col>
                  </Row>
                </article>
                <Comments item={item} />
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <p>Blog Post not available.</p>
    );
  }

  render() {
    const styles = require('./Post.scss');
    const { post, meta } = this.props;
    console.log('ALREADY RENDERING POST', post);
    if (post) {
      /*
       <Col xs={4} md={4}>
       <Categories />
       </Col>
       */
      console.log('META', meta);
      return (
        <div className={styles.blogPost}>
          <Helmet title={post.name} meta={meta} />
          {this.renderBlogPost()}
        </div>
      );
    }
    return (
      <span>Loading</span>
    );
  }
}
