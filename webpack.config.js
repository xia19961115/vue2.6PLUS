const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
// css抽离成单独文件
const miniCssExtractPlugin = require('mini-css-extract-plugin')
// 压缩CSS
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
// 复用loader
const commonCssLoader = [
    miniCssExtractPlugin.loader,
    'css-loader',
    {
      // 还需要在package.json中定义browserslist
      loader: 'postcss-loader',
    }
  ];
module.exports = {
    // 文件的入口
    entry: './src/main.js',
    // 文件的出口
    output: {
        path: path.resolve(__dirname,'dist'),
        // publicPath:'/dev',
        filename: 'js/[name].[contenthash:6].js',
        clean:true
    },
    resolve: {
        extensions: [".js", ".json", ".mjs", ".vue", ".ts", ".jsx", ".tsx"],
        alias: {
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
                use:{
                    loader:'babel-loader'
                }
            },
            // webpack5 用法
            {
                test:/\.(png|jpe?g|gif)$/,
                type:'asset/resource',
                generator: {
                    filename: 'img/[name].[hash:8].[ext]'
                  }
            }
        ]
    },
    // 插件
    plugins: [
        new miniCssExtractPlugin({
            filename: 'css/[name].[contenthash:6].css'
          }),
        new OptimizeCssAssetsWebpackPlugin(),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template:'./public/index.html',
            title:'自定义安装vue'
        }),
        new TerserPlugin({
            extractComments: false,// webpack5不将注释提取到单独的文件中
          }),
    ],
    // devtool: 'hidden-source-map',
    // 热更新
    devServer:{
        static: path.resolve(__dirname,'dist'),
        open:true,
        // host:'local-ip',
        hot: true,
        port: 'auto',
        compress:true
    }
}