import HtmlWebpackPlugin from "html-webpack-plugin";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export default {
  mode: 'development',
  entry: './src/index.tsx',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, '../app') },
    extensions: ['.tsx', '.ts', '.js'],
    modules: [path.resolve(__dirname, '../src'), 'node_modules'],
  },
  devServer: {
    static: path.resolve(__dirname, '../public'),
    historyApiFallback: true,
    port: 3000,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
    }),
  ],
};
