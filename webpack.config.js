const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js', // Entry point for your application
  output: {
    filename: 'main.js', // Output bundle name
    path: path.resolve(__dirname, 'dist'), // Output directory
    clean: true, // Clean the output directory before each build
  },
  mode: 'development', // Set to 'development' or 'production'
  devtool: 'source-map', // Enable source maps for easier debugging
  module: {
    rules: [
      {
        test: /\.js$/, // Transpile JavaScript files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/, // Process CSS files
        use: [
          'style-loader', // Injects CSS into the DOM
          'css-loader', // Resolves CSS imports
          {
            loader: 'postcss-loader', // Processes Tailwind CSS
            options: {
              postcssOptions: {
                plugins: [
                  require('tailwindcss'),
                  require('autoprefixer'),
                ],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Use an HTML template
      filename: 'index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public', to: '.' },
      ],
    }),
  ],
  devServer: {
    static: path.resolve(__dirname, 'dist'), // Serve files from the output directory
    port: 3000, // Development server port
    open: true, // Automatically open the browser
    hot: true, // Enable Hot Module Replacement
  },
};