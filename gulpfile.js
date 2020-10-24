// let preprocessor = 'sass';   // выбираем каким языком будем пользоваться:less или sass

const { src, dest, parallel, series, watch } = require('gulp');
const browserSync  = require('browser-sync').create();
const concat       = require('gulp-concat');
const uglify       = require('gulp-uglify-es').default; //сжимает и оптимизирует скрипты
const sass         = require('gulp-sass');  // добавили язык sass
const less         = require('gulp-less');  // добавили язык less для примера
const autoprefixer = require('gulp-autoprefixer');
const cleancss     = require('gulp-clean-css');  // оптимизирует css
const imagemin     = require('gulp-imagemin');
const newer        = require('gulp-newer');
const del          = require('del');

function browsersync() {
    browserSync.init({
        server: { baseDir: 'app/' },
        notify: false,
        online: true
    })
}

// function scripts() {
//     return src([
//         // 'node_modules/jquery/dist/jquery.min.js',
//         'app/js/app.js'
//     ])
//     .pipe(concat('app.min.js'))
//     .pipe(uglify())
//     .pipe(dest('app/js/'))
//     .pipe(browserSync.stream())
// }

function scripts() {
    return src([
        'node_modules/jquery/dist/jquery.min.js',
        'app/js/app.js'
    ])
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js/grid-page/'))
    .pipe(browserSync.stream())
}


// функция для обработки sass-файлов

function styles() {     
return src(['app/sass/home-page/*.scss'])   //return src('app/sass/main.sass') если есть только один язык sass
.pipe(sass())     //.pipe(sass()) если используем один язык sass
.pipe(concat('app.min.css'))
.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true}))
.pipe(cleancss(({level: {1: {specialComments: 0}}/*, format: 'beautify'*/ })))   
.pipe(dest('app/css/home-page'))
.pipe(browserSync.stream())
} 

// function styles() {     
//     return src('app/sass/bootstrap-page/*.scss')   //return src('app/sass/main.sass') если есть только один язык sass
//     .pipe(sass())     //.pipe(sass()) если используем один язык sass
//     .pipe(concat('app.min.css'))
//     .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true}))
//     .pipe(cleancss(({level: {1: {specialComments: 0}}/*, format: 'beautify'*/ })))   
//     .pipe(dest('app/css/bootstrap-page'))
//     .pipe(browserSync.stream())
    
// } 

// function styles() {     
//     return src('app/sass/grid-page/*.scss')   //return src('app/sass/main.sass') если есть только один язык sass
//     .pipe(sass())     //.pipe(sass()) если используем один язык sass
//     .pipe(concat('app.min.css'))
//     .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true}))
//     .pipe(cleancss(({level: {1: {specialComments: 0}}/*, format: 'beautify'*/ })))   
//     .pipe(dest('app/css/grid-page'))
//     .pipe(browserSync.stream())
// } 

//функция для работы с изображениями
function images() {
    return src('app/media/src/**/*')
    .pipe(newer('app/media/images'))
    .pipe(imagemin())
    .pipe(dest('app/media/images/'))
}

//функция для удаления оптимизированных изображений
function cleanimg() {
return del('app/media/images/**/*', {force: true})
}

//функция для очищения внутренностей папки dist
function cleandist() {
    return del('dist/**/*', {force: true})
    }
    

//функция для выгрузки оптимизированного проекта
function buidcopy() {
return src([
    'app/css/**/*.min.css',
    // 'app/css/bootstrap-page/**/*.min.css',
    // 'app/css/grid-page/**/*.min.css',
    'app/js/**/*.min.js',
    'app/media/images/**/*',
    'app/**/*.html',
    'app/fonts/**/*',
    'app/media/video/**/*'
], {base: 'app'})
.pipe(dest('dist'));
}


//функция для того, чтоб изменения проекта сразу отображались на экране
function startwatch() {     
    watch('app/**/sass/**/*', styles);
    watch(['app/**/*.js', '!app/**/*.min.js'], scripts);    // добавляем все js файлы
    watch('app/**/*.html').on('change', browserSync.reload);
    watch('app/media/src/**/*', images);       
} 

exports.browsersync = browsersync;
exports.scripts = scripts;
exports.styles = styles;
exports.images = images;
exports.cleanimg = cleanimg;
exports.build = series(cleandist, styles, scripts, images, buidcopy)

exports.default = parallel(styles, scripts, browsersync, startwatch)   //выполнение задач параллельно 