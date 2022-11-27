//Подключение модулей разрешено потому что в package.json указан "type":"module", что позволяет пользоваться подключением модулей из ES6
//получаем имя папки проекта.
import * as nodePath from "path";
const rootFolder = nodePath.basename(nodePath.resolve());

const srcFolder = "./src";
const buildFolder = "./dist";


export const path = {
    build: {
        js: buildFolder + "/js/",
        images: buildFolder + "/img/",
        css: buildFolder + "/css/",
        html: buildFolder + "/",
        fonts: buildFolder + "/fonts/",
        files: buildFolder + "/files/"
    },
    src: {
        js: srcFolder + "/js/app.js",
        images: srcFolder + "/img/**/*.{jpg,jpeg,png,gif,webp}",
        svg: srcFolder + "/img/**/*.svg",
        scss: srcFolder + "/scss/style.scss",
        html: srcFolder + "/*.html",//копируем только html файлы из главной папки
        svgicons: srcFolder + "/svgicons/*.svg",
        files: srcFolder + "/files/**/*.*"
    },
    watch: {
        js: srcFolder + "/js/**/*.js",  
        images: srcFolder + "/img/**/*.{jpg,jpeg,png,gif,ico,webp,svg}",
        scss: srcFolder + "/scss/**/*.scss",
        html: srcFolder + "/**/*.html",//следим за всеми html файлами, что бы генерировать итог даже при изменении html модулей
        files: srcFolder + "/files/**/*.*"
    },
    clean: buildFolder,
    buildFolder: buildFolder,
    srcFolder: srcFolder,
    rootFolder: rootFolder,
    ftp: ''
}
