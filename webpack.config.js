const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlReplaceWebpackPlugin = require('html-replace-webpack-plugin');

process.env.NODE_ENV == 'development';
process.env.BABEL_ENV == 'development';

const isEnvDevelopment = process.env.NODE_ENV === 'development';
const publicPath = process.env.PUBLIC_PATH || '';

console.log(`public path is set to: ${publicPath}`);

module.exports = {
    mode: isEnvDevelopment ? 'development' : 'production',
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.tsx','.ts','.js', '.jsx', '.json']
    },
    optimization: {
        minimize: false
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: 'ts-loader'
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        "@babel/preset-env",
                        "@babel/preset-react"
                    ],
                }
            },
            {
                test: /\.css?$/i,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|woff(2)?|ttf|svg|eot)?$/,
                use: ["file-loader"]
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'public'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve(__dirname, 'public', 'index.html'),
            publicPath: publicPath
        }),
        new HtmlReplaceWebpackPlugin([
            {
                pattern: '%PUBLIC_URL%',
                replacement: publicPath
            }
        ])
    ]
};