import superagent from 'superagent';

const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path, config) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path;
  return [
    config.secure ? 'https://' : 'http://',
    config.host,
    config.port === '80' ? '' : ':' + config.port,
    adjustedPath
  ].join('');
}

/*
 * This silly underscore is here to avoid a mysterious "ReferenceError: ApiClient is not defined" error.
 * See Issue #14. https://github.com/erikras/react-redux-universal-hot-example/issues/14
 *
 * Remove it at your own risk.
 */
class _ApiClient {
  constructor(req, config) {
    methods.forEach((method) => {
      console.log('going to build', method);
      this[method] = (path, { params, data } = {}) => new Promise((resolve, reject) => {
        console.log('GOING TO REQUEST', method, path, config);
        if (/undefined/.test(path)) {
          throw Error('no you are not');
        }
        const request = superagent[method](formatUrl(path, config));

        if (params) {
          request.query(params);
        }

        if (__SERVER__ && req.get('cookie')) {
          request.set('cookie', req.get('cookie'));
        }

        if (data) {
          request.send(data);
        }

        request.end((err, { body } = {}) => err ? reject(body || err) : resolve(body));
      }); });
  }
}

const ApiClient = _ApiClient;

export default ApiClient;
