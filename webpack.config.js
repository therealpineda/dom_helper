module.exports = {
  entry: './lib/main.js',
  output: {
    path: './lib/',
    filename: 'dom_helper.js',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '*']
  }
};
