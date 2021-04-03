const currentTask = process.env.npm_lifecycle_event
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const fse = require('fs-extra')
const { Compiler } = require('webpack')


const postCSSPlugins = [
  require('postcss-import'),
  require('postcss-mixins'),
  require('postcss-simple-vars'),
  require('postcss-nested'),
  require('autoprefixer')
]


class RunAfterCompile {
  apply(Compiler) {
  Compiler.hooks.done.tap('copy images', function () {
      fse.copySync('./app/assets/images', './docs/assets/images')
    })
  }
}



let cssConfig = {
        test: /\.css$/i,
        use: [
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


let pages = fse.readdirSync('./app').filter(function (file) {
  return file.endsWith('.html')
}).map(function (page) {
  return new HtmlWebpackPlugin({
    filename: page,
    template: `./app/${page}`
  })
})

let config = {
  entry: "./app/assets/scripts/App.js",
  plugins: pages,
  module: {
    rules: [
      cssConfig
    ]
  }
}


// --------for development

if (currentTask == 'dev') {
  cssConfig.use.unshift('style-loader')

  config.output = {
    filename: "bundled.js",
    path: path.resolve(__dirname, './app')
  }
  config.devServer = {
    before: function (app, server) {
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
  }
  config.mode = 'development'
}


// ----------for production


if (currentTask == 'build') {
  cssConfig.use.unshift(MiniCssPlugin.loader)

  config.output = {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, './docs')
  }
  config.mode = 'production'
  config.plugins.push(
    new CleanWebpackPlugin(),
    new MiniCssPlugin({
      filename: 'styles.[chunkhash].css'
    }),
    new RunAfterCompile()
  )
}


module.exports = config


