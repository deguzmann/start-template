const gulp          = require('gulp'), // Подключаем Gulp
      sass          = require('gulp-sass'), // Подключаем Sass пакет
      pug           = require('gulp-pug'),
      postcss       = require("gulp-postcss"),
      autoprefixer  = require("autoprefixer"),
     // jshint        = require('gulp-jshint'),
     // uglify        = require('gulp-uglify'),
      concat        = require('gulp-concat');

//cоздаем переменную с масивом всех плагинов Postccss который мы будем использовать, пока один autoprefixer будет 

var postplugins = [
autoprefixer({
  browsers: ["last 3 versions"]})  // поддержка последних трех версий всех браузеров
];


gulp.task('sass', function() { // Создаем таск "sass"
  return gulp.src(['source/styles/*.sass']) // Берем источник
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError)) // Преобразуем Sass в CSS посредством gulp-sass
    .pipe(postcss(postplugins))  // передаем переменную postplugins 
    .pipe(gulp.dest('public/assets/css')) // Выгружаем результата в папку css
  });

gulp.task('pages', function(){
  return gulp.src(['source/pages/*.pug'])
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest('public/'));
});
gulp.task('scripts', function() {
  return gulp.src([ // Берем все необходимые библиотеки      
      'source/blocks/**/*.js', // Берем common.js
      ])
      .pipe(concat('app.js')) // Собираем их в кучу в новом файле libs.min.js
      .pipe(gulp.dest('public/assets/js')); // Выгружаем в папку app/js
});

gulp.task('watch', function() {
  gulp.watch(['source/styles/**/*.sass', 'source/blocks/**/*.sass'], ['sass']); // Наблюдение за sass файлами в папке sass
  gulp.watch(['source/pages/*.pug', 'source/blocks/**/*.pug', 'source/pages/layout/*.pug'], ['pages']);
  gulp.watch(['source/blocks/**/*.js'], ['scripts']);
});

gulp.task('default', ['watch']);