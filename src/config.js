require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  api: {
    website: {
      host: process.env.API_HOST || 'localhost',
      port: process.env.API_PORT || 3030
    },
    content: {
      host: process.env.CONTENT_HOST || 'host_not_set',
      port: process.env.CONTENT_PORT || 3032
    }
  },
  app: {
    title: 'RobbertHalff',
    description: 'If I don\'t see you no more in this world, I\'ll meet you on the next one.',
    head: {
      titleTemplate: 'RobbertHalff: %s',
      meta: [
        { name: 'description', content: 'All the modern best practices inside one person :p' },
        { charset: 'utf-8' },
        { property: 'og:site_name', content: 'RobbertHalff' },
        { property: 'og:image', content: 'https://react-redux.herokuapp.com/logo.jpg' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:title', content: 'RobbertHalff' },
        { property: 'og:description', content: 'Website of Robbert Jan Halff.' },
        { property: 'og:card', content: 'summary' },
        { property: 'og:site', content: '@rhalff' },
        { property: 'og:creator', content: '@rhalff' },
        { property: 'og:title', content: 'RobbertHalff' },
        { property: 'og:description', content: 'All the modern best practices in one person :p' },
        { property: 'og:image', content: 'https://react-redux.herokuapp.com/logo.jpg' },
        { property: 'og:image:width', content: '200' },
        { property: 'og:image:height', content: '200' }
      ]
    }
  },

}, environment);
