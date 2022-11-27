import dartSass from "sass";//сам препроцессор
import gulpSass from "gulp-sass";//плагин для запуска препроцессора
const sass = gulpSass(dartSass);

import rename from "gulp-rename";//для переименования обработанных файлов

import cleanCss from "gulp-clean-css";//для минимизации css
import webpCss from "gulp-webpcss";//для вывода webp изображений, для его работы нужно обязательно установить ещё зависимость npm i -D webp-converter@2.2.3
import autoprefixer from "gulp-autoprefixer";//добавление вендорных префиксов для поддержки стилей в разных браузерах
import groupCssMediaQueries from "gulp-group-css-media-queries";//группировка медиа запросов в самый конец файла, что бы можно было писать media в месте стилизации


export const scss = () =>{
    return app.gulp.src(app.path.src.scss, {sourcemaps: app.isDev}) //sourcemaps true для анализа ошибок, что бы показывало в каком файле стилей происходит ошибка
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "SCSS",
                message: "Error: <%= error.message %>"
            })
        ))//обработка и вывод ошибок
        .pipe(sass({
            outputStyle: "expanded"
        }))//обработка sass файлов в css
        .pipe(groupCssMediaQueries())
        .pipe(
            app.plugins.if(//Проверка на режим запуска gulp
                app.isBuild, 
                webpCss({
                    webpClass: ".webp",
                    noWebpClass: ".no-webp"
                })
            )
        )
        .pipe(
            app.plugins.if(//Проверка на режим запуска gulp
                app.isBuild, 
                autoprefixer({
                    grid: true,//поддержка grid стилей
                    overrideBrowserlist: ["last 3 version"], //поддержка на 3 прошлые версии
                    cascade: true
                })
            )
        )

        //не сжатый вариант стилей
        .pipe(app.gulp.dest(app.path.build.css))
        
        .pipe(
            app.plugins.if(//Проверка на режим запуска gulp
                app.isBuild, 
                cleanCss()//сжатие файла
            )
        )
        .pipe(rename({
            extname: ".min.css"
        }))//переименование выходного файла
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.browserSync.stream());//Обновление браузера
}