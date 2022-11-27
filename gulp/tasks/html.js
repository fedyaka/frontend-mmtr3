//позволяет разбивать код на более мелкие и универсальные части
//первым параметром передаётся сам модульный файл, вторым параметром передаём в {список нужным параметров для генерации}
//Пример:
//@@include("html/head.html", {
//    "title":"Словарь"
//})
//доступ к параметром получается через @@имя_параметра
import fileInclude from "gulp-file-include";

//заменяет тег img на структуру webp позволяющую оптимизировать передачу изображений, для всех изображений кроме svg
import webpHtmlNosvg from "gulp-webp-html-nosvg";

//нужен для версионирования файлов, что бы при обновлении файлов, они брались не из кеша а новые
import versionNumber from "gulp-version-number";

export const html = () =>{
    return app.gulp.src(app.path.src.html)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "HTML",
                message: "Error: <%= error.message %>"
            })
        ))//вывод обработанных уведомлений в виндовс уведомления об ошибках
        .pipe(fileInclude())//обязательно нужно ипользовать () у функции, а не просто передавать в виде параметра
        .pipe(
            app.plugins.if(//Проверка на режим запуска gulp
                app.isBuild, 
                webpHtmlNosvg()
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild, 
                versionNumber({
                    "value": "%DT%",
                    "append": {
                        "key": "_v",
                        "cover": 0,
                        "to": [
                            "css",
                            "js"
                        ]
                    },
                    "output": {
                        "file": "gulp/version.json"
                    }
                })
            )
        )//версионирование ссылок, от кеширования в браузере
        .pipe(app.gulp.dest(app.path.build.html))

        .pipe(app.plugins.browserSync.stream());//обновление браузера
}