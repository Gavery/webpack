var path = require("path"); //把相对路径解析成绝对路径
var htmlWebpackPlugin = require('html-webpack-plugin'); //这个插件是解决重新打包的文件名字和模板中引入的文件名字不一样
// module.exports={
// 	//context:(这儿有一个默认的上下文路径，代表项目的根路径)
// 	//entry:'./src/script/main.js',//项目的入口文件 (第一种方式)
// 	entry:{
// 		main:"./src/script/main.js",
// 		a:"./src/script/main.js"
// 	},
// 	output:{
// 		path:path.resolve(__dirname, './dist'),
// 		filename:'js/[name]-[chunkhash].bundle.js'
// 	},

// 	plugins:[
// 	new htmlWebpackPlugin({
// 		//这些参数可以通过options属性传递给模板index.html,然后再进行重新打包
// 		filename:'index.html',//指定生成的文件名字
// 		template:'index.html',//引用根目录下面的index.html作为模板
// 		inject:'head',//把导入的脚本放在head标签之间
// 		title:'webpack is good',
// 		date:new Date(),
// 		minify:{
// 			removeComments:true,
// 			collapseWhitespace:true
// 		}
// 	})
// 	]
// }

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'js/[name].bundle.js'
    },
    module: {


        loaders: [
            //配置的处理js的loader
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: path.resolve(__dirname, './node_modules/'), //指定不用处理的文件
                include: [
                    path.resolve(__dirname, './src/') //指定要打包的目录下的文件
                ],
                query: { //这也是一种方式，在package.json( // "babel":{
                    //   "presets":["latest"]
                    // })文件中配置了这里就不用配置了
                    presets: ['latest']
                }
            },
            //处理html的loader
            {
                test: /\.html$/,
                use: [
                    'html-loader'
                ]
            },

            //配置处理css的loader
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader', {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')({
                                    broswers: ['last 5 versions']
                                })
                            ]
                        }
                    }
                ]
            },

            //处理less文件loader
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings 
                }, {
                    loader: "css-loader" // translates CSS into CommonJS 
                }, {
                    loader: 'postcss-loader',
                    options: {
                        plugins: [
                            require('autoprefixer')({
                                broswers: ['last 5 versions']
                            })
                        ]
                    }
                }, {
                    loader: "less-loader" // compiles Less to CSS 
                }]
            },
            //处理sass的loader
            {
                test: /\.sass$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings 
                }, {
                    loader: "css-loader" // translates CSS into CommonJS 
                }, {
                    loader: 'postcss-loader',
                    options: {
                        plugins: [
                            require('autoprefixer')({
                                broswers: ['last 5 versions']
                            })
                        ]
                    }
                }, {
                    loader: "sass-loader" // compiles Less to CSS 
                }]
            },
            //处理图片的loader
            {
                test:/\.(png|jpg|gif|svg)$/i,

                // loader:'url-loader',
                // query:{
                //     name:'assets/[name]-[hash:5].[ext]'//指定生成图片的路径和名字
                // }

                loaders:[
                'file-loader?name=assets/[name]-[hash:5].[ext]',//问号代表传递的参数
                'image-webpack-loader'//压缩图片的大小
                ]
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: 'body'
        })
    ]

}