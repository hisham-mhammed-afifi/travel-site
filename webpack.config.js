const path = require('path')

const postCSSPlugins = [
  require('postcss-import'),
  require('postcss-mixins'),
  require('postcss-simple-vars'),
  require('postcss-nested'),
  require('autoprefixer')
]

module.exports = {
  entry: "./app/assets/scripts/App.js",
  output: {
    filename: "bundled.js",
    path: path.resolve(__dirname, './app')
  },
  devServer: {
    before: function (app, server, compiler) {
      server._watch('./app/**/*.html')
    },
    contentBase: [
      path.join(__dirname, './app'),
      path.join(__dirname, './assets')
    ],
    publicPath: '/',
    hot: true,
    port: 3000,
    host: '0.0.0.0'
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              url: false,
            }
          },
          {
          loader: 'postcss-loader',
            options:
            {
              postcssOptions:
              {
                plugins: postCSSPlugins
              }
            }
          }
        ]
      }
    ]
  }
}