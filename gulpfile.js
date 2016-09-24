'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    path = require('path'),
    browserSync = require('browser-sync').create(),
    useref = require('gulp-useref'),
    uglify = require('gulp-uglify'),
    gulpIf = require('gulp-if'),
    jshint = require('gulp-jshint'),
    run = require('gulp-run'),
    plumber = require('gulp-plumber'),
    cssnano = require('gulp-cssnano'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    copy = require('gulp-copy'),
    del = require('del'),
    runSequence = require('run-sequence'),
    config = require('./config');

var source = config.source,
    build = config.build;

var onError = function(err) {
    console.log(err);
}

gulp.task('sass', function() {
    return gulp.src(path.join(__dirname, source, 'css', 'style.scss'))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(path.join(__dirname, source, 'css')))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('images', function() {
    return gulp.src(path.join(__dirname, source, 'img', '*.+(png|jpg|gif|svg)'))
        .pipe(cache(imagemin()))
        .pipe(gulp.dest(path.join(__dirname, build, 'img')));
});

gulp.task('lint', function() {
    return gulp.src(path.join(__dirname, source, 'js', '*.js'))
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: source
        },
    })
});

gulp.task('useref', function() {
    return gulp.src(path.join(__dirname, source, '*.html'))
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest(path.join(__dirname, build)));
});

gulp.task('clean:dist', function() {
    return del.sync(path.join(__dirname, build));
});

gulp.task('cache:clear', function(callback) {
    return cache.clearAll(callback)
});

gulp.task('copy', function(){
    return gulp.src(path.join(__dirname, source, 'views', '*.html'))
        .pipe(gulp.dest(path.join(__dirname, build, 'views')));
})

gulp.task('watch', ['browserSync', 'sass'], function() {
    gulp.watch(path.join(__dirname, source, 'css', '**', '*.scss'), ['sass']);
    gulp.watch(path.join(__dirname, source, '*.html'), browserSync.reload);
    gulp.watch(path.join(__dirname, source, 'views', '*.html'), browserSync.reload);
    gulp.watch(path.join(__dirname, source, 'js', '*.js'), ['lint'], browserSync.reload);
});

gulp.task('default', function(callback) {
    runSequence(['sass', 'browserSync', 'watch'],
        callback
    )
});

gulp.task('build', function(callback) {
    runSequence('clean:dist', ['sass','useref', 'copy'],
        callback
    )
});

gulp.task('install', function() {
    return run('cd src && npm install').exec();
});

gulp.task('server', function(){
    return run('npm start').exec();
});

gulp.task('heroku:production', function(callback){
    runSequence(['build', 'server'],
        callback
    )
});
