import webp from "gulp-webp";//генерация формата webp
import imagemin from "gulp-imagemin";//сжимание изображений

export const images = () => {
    return app.gulp.src(app.path.src.images)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "IMAGES",
                message: "Error: <%= error.message %>"
            })
        ))//обработка и уведомление ошибок

        .pipe(app.plugins.newer(app.path.build.images))
        .pipe(
            app.plugins.if(//Проверка на режим запуска gulp
                app.isBuild, 
                webp()//переврд в изображения формата webp, кроме svg
            )
        )
        .pipe(
            app.plugins.if(//Проверка на режим запуска gulp
                app.isBuild, 
                app.gulp.dest(app.path.build.images)
            )
        )
        .pipe(
            app.plugins.if(//Проверка на режим запуска gulp
                app.isBuild, 
                app.gulp.src(app.path.src.images)
            )
        )
        .pipe(
            app.plugins.if(//Проверка на режим запуска gulp
                app.isBuild, 
                app.plugins.newer(app.path.build.images)
            )
        )
        .pipe(
            app.plugins.if(//Проверка на режим запуска gulp
                app.isBuild, 
                imagemin({//сжатие
                    progressive: true,
                    svgPlugins: [{removeViewBox: false }],
                    interplaced: true,
                    optimizationLevel: 2 //сжатие изображений от 0 до 7, лучше максимально ставить 3 для того что бы не терять сильно качество изображения
                })
            )
        )
        .pipe(app.gulp.dest(app.path.build.images))

        .pipe(app.gulp.src(app.path.src.svg))//вывод svg изображений
        .pipe(app.gulp.dest(app.path.build.images))

        .pipe(app.plugins.browserSync.stream());//обновление браузера
}