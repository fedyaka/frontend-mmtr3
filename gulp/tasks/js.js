//нужен для того что бы можно было работать со свойствами ES6, то есть что бы можно было экспортировать и импортировать константы между файлами
//так же нужен для оптимизации js 
import webpack from "webpack-stream";//так же обязательно нужен сам webpack npm i -D webpack webpack-stream
// import babel from "gulp-babel";//нужен для поддержки JSX и поддержки более старых браузеров неподдерживающих ES6

export const js = () =>{
    return app.gulp.src(app.path.src.jsx, {sourcemaps: app.isDev})//sourcemaps для определения в каком файле произошла ошибка
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "JS",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(webpack({
                mode: app.isBuild ? "production" : "development", //проверка на режим запуска gulp
                entry:["@babel/polyfill", app.path.src.jsx],
                module: {
                    rules: [
                        {
                            test: /\.js$/,
                            exclude: /node_modules/,
                            use: {
                                loader:"babel-loader",
                                options: {
                                    presets:["@babel/preset-env"]
                                }
                            }
                        },
                        {
                            test: /\.jsx$/,
                            exclude: /node_modules/,
                            use: {
                                loader:"babel-loader",
                                options: {
                                    presets:["@babel/preset-react", "@babel/preset-env"]
                                }
                            }
                        }
                    ]
                },
                output: {
                    filename: "app.min.js"
                }
            })
        )
        .pipe(app.gulp.dest(app.path.build.js))
        .pipe(app.plugins.browserSync.stream());//обновление браузера
}