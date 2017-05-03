'use strict';

const path = require('path');
const webpack = require("webpack");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const BUILD_PATH = path.resolve(__dirname, '../MusicNet/wwwroot');
const APP_PATH = path.resolve(__dirname, 'app');

module.exports = {
	entry: [
		"./src/index.jsx",
		"./src/styles/main.css",
		"./src/styles/modal.css"
	], // входная точка - исходный файл
	output: {
		path: BUILD_PATH,     // путь к каталогу выходных файлов
		filename: "bundle.js"       // название создаваемого файла
	},
	devtool: "source-map",
	resolve: {
		extensions: [".js", ".jsx", ".svg", ".png"] // расширения для загрузки модулей
	},
	module: {
		loaders: [
			{  //загрузчики
				test: /\.jsx?$/,
				exclude: /(node_modules)/,
				loader: "babel-loader",
				query: {
					presets: ["es2015", "react"]
				}
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader?sourceMap' })
			},
			{
				test: /\.(jpg|png|svg)$/,
				loader: 'url-loader',
				options: {
					limit: 25000
				}
			},
			{
				test: /\.(jpg|png|svg)$/,
				loader: 'file-loader',
				options: {
					name: './images/[hash].[ext]'
				}
			}
		]
	},

	plugins: [
		//new webpack.optimize.UglifyJsPlugin(),
		//new webpack.NoEmitOnErrorsPlugin(),
		new ExtractTextPlugin('bundle.css')
        /*new HtmlWebpackPlugin({
            hash: true,
            title: "Test",
            template: "./index.html"
        }),*/
        /*new webpack.optimize.CommonsChunkPlugin({
            name: ["common", "vendor"],
            minChunks: 2
        })*/
	]
}