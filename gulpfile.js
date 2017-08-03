const gulp = require('gulp'),
    plumber = require('gulp-plumber'),  //中断处理
    less = require('gulp-less'), //less处理插件
    autoprefixer = require('gulp-autoprefixer'), //css自动补全
    imagemin = require('gulp-imagemin'), //图片压缩
    cache = require('gulp-cache'), //缓存管理
    uglify = require('gulp-uglify'), //js压缩插件
    cssmin = require('gulp-clean-css'), //css压缩
    jshint = require("gulp-jshint"), //js的语法检测
    connect = require("gulp-connect"), //connect
    shelljs = require('shelljs/global'), //shell命令
    ts = require('gulp-typescript'),
    opn = require('opn'); //打开网站

const config = require("./config.json"); //配置文件

let isServer = false;   //动态服务是否启动
let list = process.argv.slice(3); //脚本解析
let compress = false; //是否压缩

console.log(config);

let setLess = (path, dist) => {
    let result = gulp.src(path)
        .pipe(plumber())
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true,
            remove: true
        }))

    if (compress) result = result.pipe(cssmin())
    result.pipe(gulp.dest(dist))
}
let setImage = (path, dist, base) => {
    gulp.src(path, { base: base })
        .pipe(plumber())
        .pipe(cache(imagemin()))
        .pipe(gulp.dest(dist))
}
let setJavascript = (path, dist, base) => {
    let result = gulp.src(path, { base: base }).pipe(plumber()).pipe(jshint());
    if (compress) result = result.pipe(uglify())
    result.pipe(gulp.dest(dist))
}
let setTypeScript = (path, dist, base) => {
    let result = gulp.src(path, { base: base }).pipe(plumber()).pipe(ts({ module: "amd" })).pipe(jshint());
    if (compress) result = result.pipe(uglify())
    result.pipe(gulp.dest(dist))
}
let setHtml = (path, dist, base) => {
    gulp.src(path, { base: base })
        .pipe(plumber())
        //.pipe(htmlmin())
        .pipe(gulp.dest(dist))
}
let copyFiles = (path, dist, base) => {
    cp("-R", path, dist);
}
let watchfn = (list, cb) => {
    list.forEach(function (item) {
        item && gulp.watch(item.src, function (event) {
            cb(event.path, item.dist, item.base);
            isServer && server.notify(event);
        });
    });
}
let buildFn = (list, cb) => {
    list.forEach(function (item) {
        cb(item.src, item.dist, item.base);
    });
}
//清除所有生成代码
gulp.task("clean", function () {
    rm("-rf", "dist/");
});
//监听文件改动
gulp.task("watch", function () {
    //监控less
    config.less && watchfn(config.less, setLess);
    //image
    config.img && watchfn(config.img, setImage);
    //js
    config.js && watchfn(config.js, setJavascript);
    //ts
    config.ts && watchfn(config.ts, setTypeScript);
    //html
    config.html && watchfn(config.html, setHtml);
});
//重新生成对应代码
gulp.task("build", ["clean"], function () {
    list.forEach(function (item) {
        if (item == "-o") compress = true;
    });
    config.less && buildFn(config.less, setLess);
    config.img && buildFn(config.img, setImage);
    config.js && buildFn(config.js, setJavascript);
    config.ts && buildFn(config.ts, setTypeScript);
    config.html && buildFn(config.html, setHtml);
    config.copy && buildFn(config.copy, copyFiles);
});
//启动server服务
gulp.task("server", function () {
    connect.server({
        root: "dist",
        port: 8080,
        livereload: true
    });
    //connect.reload()
    opn("http://127.0.0.1:8080");
    isServer = true;
});
gulp.task("help", function () {
    console.log("百度吧");
});

gulp.task("default", ["watch", "server"]);
