import React, { PropTypes } from 'react';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';

const SHORTNAME = 'robberthalff';
const WEBSITE_URL = 'http://robberthalff.com';

function renderDisqus() {
  if (window.DISQUS === undefined) {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://' + SHORTNAME + '.disqus.com/embed.js';
    document.getElementsByTagName('head')[0].appendChild(script);
  } else {
    window.DISQUS.reset({reload: true});
  }
}

class DisqusThread {
  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired
  };

  shouldComponentUpdate(nextProps) {
    return this.props.id !== nextProps.id ||
      this.props.title !== nextProps.title ||
      this.props.path !== nextProps.path;
  }

  componentDidMount() {
    renderDisqus();
  }

  componentDidUpdate() {
    renderDisqus();
  }

  render() {
    const {id, title, path, ...other} = this.props;

    if (canUseDOM) {
      /* eslint-disable camelcase */
      window.disqus_shortname = SHORTNAME;
      window.disqus_identifier = id;
      window.disqus_title = title;
      window.disqus_url = WEBSITE_URL + path;
      /* eslint-enable camelcase */
    }

    return <div {...other} id="disqus_thread" />;
  }

}

export default DisqusThread;
