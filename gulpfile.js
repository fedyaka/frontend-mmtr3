//Подключение модулей разрешено потому что в package.json указан "type":"module", что позволяет пользоваться подключением модулей из ES6
//подключаем основной модуль. Поиск ведётся по названию в DevDependencies в файле package.json, то есть сначала нужно подключить через npm.
//npm i gulp -D, так же нужно что бы gulp был установлен глобально на пк, npm i gulp-cli -g
import { gulp } from "gulp";
//импорт константы path из файла оп переданному пути
import { path } from "./gulp/config/path.js";
//импорт плагинов
import { plugins } from "./gulp/config/plugins.js";


//передача значений в глобальную переменную
global.app = {
    isBuild: process.argv.includes("--build"),//режим продакшена
    isDev: !process.argv.includes("--build"),//разработчика
    path: path,
    gulp: gulp,
    plugins: plugins
}


//импорт констант{ имя константы }, то есть импорт задач 
import { copy } from "./gulp/tasks/copy.js";
import { clearn } from "./gulp/tasks/clearn.js";
import { html } from "./gulp/tasks/html.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { server } from "./gulp/tasks/server.js";
import { images } from "./gulp/tasks/images.js";
import { oftToTtf, ttfToWoff, ttfToWoff2, fontsStyle} from "./gulp/tasks/fonts.js"
import { svgSpriter } from "./gulp/tasks/svgSpriter.js";
import { zip } from "./gulp/tasks/zip.js";
import { ftp } from "./gulp/tasks/ftp.js";


//наблюдатель за изменениями в файлах
function watcher() {
    //встроенная gulp функция асинхронной проверки файлов, передаётся путь и функция которую нужно выполнить при изменениях
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.images, images);
    //если нужно что бы файлы автоматический отправлялись на ftp сервер при изменениях, то нужно будет добавить для всех вартчеров gulp.series(станд_таск, ftp);
}




//последовательная обработка шрифтов
const fonts = gulp.series(oftToTtf, ttfToWoff, ttfToWoff2, fontsStyle);

//описание параллельного выполнение задач, для ускорения выполнения
const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images));
const serverWatchTasks = gulp.parallel(watcher, server);

//построение цепочки сценариев для режимов
//Метод series выполняет задачи последовательно
const dev = gulp.series(clearn, mainTasks, serverWatchTasks);//режим разработки
const fullDev = gulp.series(clearn, mainTasks, serverWatchTasks);//работает с режимом продакшена
const build = gulp.series(clearn, mainTasks);//режим продакшена
const deployZIP = gulp.series(clearn, mainTasks, zip);//генерирует zip файл, а так же обрабатывает как для продакшена все остальные файлы
const deployFTP = gulp.series(clearn, mainTasks, ftp);//подключение к ftp серверу и загрузка туда файлов проекта

//экспорт режимов
//npm run svgSpriter
export { svgSpriter } //преобразует все svg файлы в один спрайт
//npm run dev
export { dev };
//npm run fullDev
export { fullDev }
//npm run build
export { build };
//npm run zip
export {deployZIP};
//npm run ftp
export {deployFTP};

//так же это записано в package.json в виде
//"scripts": {
//   "svgSpriter": "gulp svgSpriter",
//   "build": "gulp build --build",
//   "svgSpriter": "gulp svgSpriter",
//   "zip": "gulp deployZIP --build"
//}

//Для настройки под разные режимы в тасках.В данном случае если режим продакщена isBuild
// .pipe(
//     app.plugins.if(//Проверка на режим запуска gulp
//     app.isBuild, 
//     функция_которую_нужно_выполнить()
//     )
// )


//выполнение дефолтного сценария("default", передаём сценарий или функцию напрямую)
gulp.task("default", dev);
