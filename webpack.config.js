const path = require('path');

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js',
      },
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/,
          }, {
            test: /\.s?css$/,
            use: [                 // use lets us include an array of loaders
                'style-loader',
                'css-loader',
                'sass-loader',
            ],
          }, {
            test: /\.jpe?g|png|gif|svg$/i,
            use: [                 // use lets us include an array of loaders
                'file-loader?name=[name].[ext]&outputPath=images/',
            ],
          },],
      },
    devtool: 'cheap-module-eval-source-map', // show my code in console when I run into an error instead of bundle.js
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: true,
      },
  };
