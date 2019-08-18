const path = require('path');
const SRC_DIR = path.join(__dirname, '/client/src');
const DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {

    entry: `${SRC_DIR}/index.js`,
    output: {
      filename: 'bundle.js',
      path: DIST_DIR
    },
    module: {
      rules : [
        {
          exclude: /node_modules/,
          include: SRC_DIR,
          loaders: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-transform-runtime']
          }
        }
      ]
    },
}