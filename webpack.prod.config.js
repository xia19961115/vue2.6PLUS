const path = require('path')
const Webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
// 复用loader
const commonCssLoader = [
    miniCssExtractPlugin.loader,
    'css-loader',
    {
      loader: 'postcss-loader',
    }
]

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname,'dist'),
        // publicPath: '/', // 打包出的路径配置
        filename: 'js/[name].[contenthash:6].js',
        clean:true
    },
    resolve: {
        extensions: [".js", ".json", ".mjs", ".vue", ".ts", ".jsx", ".tsx"],
        alias: {
          'vue$': 'vue/dist/vue.esm.js',
          "@": path.resolve(__dirname, "src"),
        },
    },
    // 使用的loader
    module:{
        rules:[
            {test: /\.vue$/, use: 'vue-loader'},
            {test: /\.css$/,use: [...commonCssLoader]},
            {test:/\.s[ca]ss$/,use:[...commonCssLoader,'sass-loader']},
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use:{
                    loader:'babel-loader'
                }
            },
            {
                test:/\.(jpe?g|png|gif|svg)$/,
                type:'asset/resource',
                generator: {
                    filename: 'img/[name].[hash:8].[ext]'
                  }
            },
            {
                test:/\.(eot|ttf|woff2?)$/,
                type:'asset/resource',
                generator: {
                    filename: 'font/[name].[hash:8].[ext]'
                  }
            }
        ]
    },
    plugins: [
        new OptimizeCssAssetsWebpackPlugin(),
        new VueLoaderPlugin(),
        new miniCssExtractPlugin({
            filename: 'css/[name].[contenthash:6].css'
        }),
        new HtmlWebpackPlugin({
            template:'./public/index.html',
            title:'测试',
            inject: true,
            minify: {
                removeComments: true,
                removeAttributeQuotes: true,
                collapseWhitespace: true,
            }
        }),
        new TerserPlugin({
            extractComments: false,// webpack5不将注释提取到单独的文件中
        }),
        new Webpack.DefinePlugin({
            'process.env': require(`./.env.production`)
        }),
    ],
    mode: 'production',
    performance: {
        hints: false
    },
    devtool: false,
    target: 'browserslist',
}