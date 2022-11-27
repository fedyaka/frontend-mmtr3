//нужен для того что бы можно было работать со свойствами ES6, то есть что бы можно было экспортировать и импортировать константы между файлами
//так же нужен для оптимизации js 
import webpack from "webpack-stream";//так же обязательно нужен сам webpack npm i -D webpack webpack-stream

export const js = () =>{
    return app.gulp.src(app.path.src.js, {sourcemaps: app.isDev})//sourcemaps для определения в каком файле произошла ошибка
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "JS",
                message: "Error: <%= error.message %>"
            })
        ))//обработка и уведомление ошибок
        .pipe(webpack({
            mode: app.isBuild ? "production" : "development",
            output: {
                filename: "app.min.js"
            }
        }))
        .pipe(app.gulp.dest(app.path.build.js))
        .pipe(app.plugins.browserSync.stream());//обновление браузера
}