//происходит получение начального пути к файлам при помощи метода gulp.src(путь к файлам)
//делаем действие .pipe
//передаём в действие функцию конечного пути gulp.dest(путь к выходу)
//тем самым делаем копирование
export const copy = () => {
    return app.gulp.src(app.path.src.files)
        .pipe(app.gulp.dest(app.path.build.files));
}
