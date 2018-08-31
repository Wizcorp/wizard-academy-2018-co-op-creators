const path = require('path');

module.exports = {
	entry: './src/index.ts',
	devtool: false,
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			}
		]
	},
	optimization: {
		minimize: true
	},
	resolve: {
		extensions: [ '.tsx', '.ts', '.js' ]
	},
	output: {
		path: path.resolve(__dirname, 'build'),
		publicPath: '/build/',
		filename: 'game.bundle.js'
	},
	mode: 'development',
	devServer: {
		contentBase: [path.join(__dirname, 'build'), path.join(__dirname)],
		compress: true,
		port: 8080
	}
};
