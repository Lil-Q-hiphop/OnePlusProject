const gulp = require('gulp');
const scss = require('gulp-sass');
const minifycss = require('gulp-minify-css');
const rename = require('gulp-rename');

gulp.task('copy-html', function () {
    return gulp
        .src('*.html')
        .pipe(gulp.dest('dist/'))
        .pipe(connect.reload());
});

gulp.task('data', function () {
    return gulp
        .src(['*.json', '!package.json'])
        .pipe(gulp.dest('dist/data'))
        .pipe(connect.reload());
});

gulp.task('scripts', function () {
    return gulp
        .src(['*.js', '!gulpfile.js'])
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload());
});

gulp.task('php', function () {
    return gulp
        .src('*.php')
        .pipe(gulp.dest('dist/php'))
        .pipe(connect.reload());
});

gulp.task("scssIndex", function () {
    return gulp.src("stylesheet/index.scss")
        .pipe(scss())
        .pipe(gulp.dest("dist/css"))
        .pipe(minifycss())
        .pipe(rename("index.min.css"))
        .pipe(gulp.dest("dist/css"))
        .pipe(connect.reload());
});
gulp.task("scssShop", function () {
    return gulp.src("stylesheet/shopstore.scss")
        .pipe(scss())
        .pipe(gulp.dest("dist/css"))
        .pipe(minifycss())
        .pipe(rename("shopstore.min.css"))
        .pipe(gulp.dest("dist/css"))
        .pipe(connect.reload());
});

gulp.task("scssAll", function () {
    return gulp.src("stylesheet/*.scss")
        .pipe(scss())
        .pipe(gulp.dest("dist/css"))
        .pipe(connect.reload());
});

gulp.task("build", ["scssIndex", "scssShop", "scripts", "copy-html", "data", "scssAll", "php"], function () {
    console.log("项目建立成功");
});

gulp.task("watch", function () {
    gulp.watch("stylesheet/index.scss", ["scssIndex"]);
    gulp.watch("stylesheet/shopstore.scss", ["scssShop"]);
    gulp.watch(["*.js", "!gulpfile.js"], ['scripts']);
    gulp.watch("*.html", ['copy-html']);
    gulp.watch(["*.json", "!package.json"], ['data']);
    gulp.watch(["stylesheet/*.scss"], ['scssAll']);
    gulp.watch("*.php", ['php']);
});

const connect = require("gulp-connect");
//启动临时服务器
gulp.task("server", function () {
    connect.server({
        root: "dist",
        port: 6161,
        livereload: true,
    })
});

gulp.task("default", ['server', 'watch']);