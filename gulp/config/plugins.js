import plumber from "gulp-plumber";//обработка ошибок
import notify from "gulp-notify";//вывод подсказок при ошибках
import browserSync from "browser-sync";//локальный сервер, так же позволяет автоматический обновлять изменения в браузере
import newer from "gulp-newer";//нужен для того что бы создавать только новые файлы, а не обрабатывать все при добавлении одного, нужен для изображений
import ifPlugin from "gulp-if";//условное ветвление для режимов работы

export const plugins = {
    plumber: plumber,
    notify: notify,
    browserSync: browserSync,
    newer: newer,
    if: ifPlugin
}