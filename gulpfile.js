const gulp = require('gulp');
const fileInclude = require('gulp-file-include');
const scss = require('gulp-sass')(require('sass'));
const server = require('gulp-server-livereload');
 const clean = require('gulp-clean');
 const fs = require('fs');
// const groupMedia = require('gulp-group-css-media-queries');
 const sourceMaps = require('gulp-sourcemaps');
const plamber = require('gulp-plumber');
const notify =  require('gulp-notify');
const webpack = require('webpack-stream');
const babel = require('gulp-babel')
const groupMedia = require('gulp-group-css-media-queries');


const imagemin = require('gulp-imagemin')

    const fileIncludeSetting = {
        prefix: '@@',
            basepath: '@file'
    };

    const serverSetting = {
                livereload: true,
                open: true
            };
   


    const plamberNotify = (title) => {
        return {
        errorHandler: notify.onError({
            title: title,
            message: 'Error <%= error.message %>',
            sound: false
        })
    }
    }

gulp.task('html', function() {
    return gulp.src('./src/*.html')
        .pipe(plamber(plamberNotify('HTML')))
        .pipe(fileInclude(fileIncludeSetting))
            .pipe(gulp.dest('./dist'))
});

gulp.task('scss', function() {
  return gulp
    .src('./src/scss/main.scss')               
    .pipe(plamber(plamberNotify('SCSS')))
    .pipe(sourceMaps.init())
    .pipe(scss().on('error', scss.logError))
        .pipe(groupMedia()) 
    .pipe(sourceMaps.write())
    .pipe(gulp.dest('./dist/css/'))
});


gulp.task('images', function() {
    return gulp.src('./src/img/**/*', { encoding: false })
    // .pipe(imagemin({verbose: true}))
     .pipe(gulp.dest("./dist/img/"))
});

gulp.task('fonts', function() {
    return gulp.src('./src/fonts/**/*')
     .pipe(gulp.dest("./dist/fonts/"))
});

gulp.task('js', function(){
    return gulp.src('./src/js/*.js')
    .pipe(plamber(plamberNotify('JS')))
    .pipe(babel())
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('./dist/js/'))
        
})

gulp.task('server', function(){
    return gulp.src('./dist')
        .pipe(server(serverSetting))
});

gulp.task('clean', function(done){
    if (fs.existsSync('./dist/')) {

        return gulp.src('./dist/', {read: false})
            .pipe(clean({force: true}))
    }
      done()
});

gulp.task('watch', function(){
    gulp.watch('./src/scss/**/*.scss', gulp.parallel('scss'));
    gulp.watch('./src/**/*.html', gulp.parallel('html'));
    gulp.watch('./src/img/**/*', gulp.parallel('images'));
    gulp.watch('./src/fonts/**/*', gulp.parallel('fonts'));
    gulp.watch('./src/js/**/*.js', gulp.parallel('js'));

});
 

gulp.task('default', gulp.series(
    'clean',
    gulp.parallel('html', 'scss', 'images', 'fonts', 'js'), 
    gulp.parallel('server', 'watch')

));