module.exports = {
    presets:['@babel/preset-env'],
    // npm install --save-dev @babel/plugin-transform-runtime
    // 解决 在项目中使用了async/await,就开始报错regeneratorRuntime is not defined
    // plugins:["@babel/plugin-transform-runtime",]
    plugins:["@babel/plugin-transform-runtime",]
}