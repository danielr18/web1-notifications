import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import {HotModuleReplacementPlugin, LoaderOptionsPlugin} from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const defaultEnv = {
    dev: true,
    production: false,
};

export default (env = defaultEnv) => ({
  entry: [
    ...env.dev ? [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:8080',
    ] : [],
    path.join(__dirname, 'src/index.jsx'),
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    ...env.dev ? [
      new HotModuleReplacementPlugin(),
    ] : [
      new ExtractTextPlugin('[name].css'),
    ],
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.join(__dirname, 'src/index.html'),
    }),
    new LoaderOptionsPlugin({
      options: {
        sassLoader: {
          data: '@import "' + path.resolve(__dirname, 'src/theme/_theme.scss') + '";'
        }
      }
    }),
  ],
  module: {
    rules: [
      // {
      //   test: /.jsx?$/,
      //   exclude: /node_modules/,
      //   enforce: 'pre',
      //   use: [
      //     {
      //       loader: 'eslint',
      //     }
      //   ]
      // },
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        include: path.join(__dirname, 'src'),
        use: [
          {
            loader: 'babel',
            options: {
              babelrc: false,
              presets: [
                ['es2015', { modules: false }],
                'react',
              ],
              plugins: [
                'react-hot-loader/babel',
                'transform-es2015-destructuring',
                'transform-object-rest-spread',
              ]
            }
          }
        ]
      },
      {
        test: /\.(css|scss|sass)$/,
        loader: env.dev ? 'style!css?modules&camelCase=dashes&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass' : ExtractTextPlugin.extract({
          fallbackLoader: 'style',
          loader: 'css-loader?modules&camelCase=dashes&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass'
        })
      },
    ]
  },
  devServer: {
    hot: env.dev
  },
  devtool: env.dev ? 'cheap-module-eval-source-map' : 'cheap-module-source-map',
});
