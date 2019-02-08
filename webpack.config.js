const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: {
		main: './src/index.ts'
	},
	output: {
		filename: '[name].bundle.js',
		chunkFilename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [{
			test: /\.ts?$/,
			use: [{
				loader: 'ts-loader',
				options: {
					transpileOnly: true
				}
			}]
		}]
	},
	resolve: {
		extensions: ['.ts', '.js', '.json']
	},
	devtool: 'inline-source-map',
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			title: 'Piiixls'
		}),
		new CopyWebpackPlugin([{
			from: 'src/assets',
			to: 'assets'
		}]),
		new webpack.HotModuleReplacementPlugin()
	],
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		hot: true,
		port: 8000
	}
};