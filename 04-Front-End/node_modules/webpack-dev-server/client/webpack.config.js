module.exports = {
	module: {
		rules: [
			{
				test: /\.pug$/,
				use: [
					"pug-loader?self",
				]
			},
			{
				test: /\.css$/,
				use: [
					"style-loader",
					"css-loader"
				],
			}
		]
	}
};
