'use strict';

const path = require('path');
const webpack = require("webpack");

const BUILD_PATH = path.resolve(__dirname, '../MusicNet/wwwroot/js');
const APP_PATH = path.resolve(__dirname, 'app');

module.exports = {
	entry: "./src/index.jsx", // входная точка - исходный файл
	output: {
		path: BUILD_PATH,     // путь к каталогу выходных файлов
		filename: "bundle.js"       // название создаваемого файла
	},
	devtool: "source-map",
	resolve: {
		extensions: [".js", ".jsx"] // расширения для загрузки модулей
	},
	module: {
		loaders: [
			{  //загрузчики
				test: /\.jsx?$/, // определяем тип файлов
				exclude: /(node_modules)/,
				loader: "babel-loader",
				query: {
					presets: ["es2015", "react"]
				}
			}
		]
	},

	plugins: [
		//new webpack.optimize.UglifyJsPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
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