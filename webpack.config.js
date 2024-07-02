import path from 'path';
import webpack from 'webpack';

export default {
  mode: 'development',
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  entry: './index.js',
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: 'bundle.cjs',
    libraryTarget:'commonjs2',
  },
  externals: {
    os: 'os',
    path: 'path',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // If using Babel for transpiling
        },
      },
    ],
  },
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
  ],
};
