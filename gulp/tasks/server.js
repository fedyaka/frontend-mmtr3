import historyApiFallback from 'connect-history-api-fallback';

export const server = () => {
    app.plugins.browserSync.init({
        server: {
            baseDir: app.path.build.html,
            middleware: [historyApiFallback()] //нужен для адекватной работы router react, так же нужно использовать "/" в начале пути к файлам в html
        },
        notify: true,
        port: 3000
        // //нужно для выключения Content Security Policy, если есть проблемы, то раскоментить
        // rewriteRules: [
        //     {
        //         match: /Content-Security-Policy/,
        //         fn: function (match) {
        //             return "DISABLED-Content-Security-Policy";
        //         }
        //     }
        // ]
    })
};