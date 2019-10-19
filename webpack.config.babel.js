import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlWebpackInlineSourcePlugin from 'html-webpack-inline-source-plugin';
import path from 'path';
const ENV = process.env.NODE_ENV || 'development';

export default {
  context: path.resolve(__dirname, "src"),
  entry: './index.js',

  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: '/',
    filename: 'bundle.js'
  },

  resolve: {
    extensions: ['.jsx', '.js'],
    modules: [
      path.resolve(__dirname, "src/lib"),
      path.resolve(__dirname, "node_modules"),
      'node_modules'
    ]
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          plugins: ["babel-plugin-transform-object-rest-spread"]
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader?modules&localIdentName=" + (ENV == 'production' ? "[local]" : "[local]")
        })
      },
    ]
  },

  plugins: ([
    new ExtractTextPlugin({ filename: 'style.css', allChunks: true, disable: ENV !== 'production' }),
    new HtmlWebpackPlugin({
      template: './index.ejs',
      minify: { collapseWhitespace: true },
      inlineSource: '(.js|.css)$'
    }),
    new HtmlWebpackInlineSourcePlugin(HtmlWebpackPlugin)
  ]),

  stats: { colors: true },

  node: {
    global: true,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
    setImmediate: false
  }
};
