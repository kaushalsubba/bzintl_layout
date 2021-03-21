var gulp=require('gulp');
var sass=require('gulp-sass');
var concat = require("gulp-concat");
var uglifyCSS=require('gulp-uglifycss');
var uglify = require('gulp-uglify');
var fileinclude = require('gulp-file-include');
var purgecss = require('gulp-purgecss');
var sourcemaps = require('gulp-sourcemaps');
const htmlmin = require('gulp-htmlmin');


//create CSS
gulp.task('create_css',function(){
    return gulp.src(['src/scss/*.scss','./node_modules/owl.carousel/dist/assets/owl.carousel.min.css','./node_modules/owl.carousel/dist/assets/owl.theme.default.css'])
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('style.css'))
        /*
        .pipe(
            purgecss({`
              content: ['*.html']
            })
          )
        */
        //.pipe(uglifyCSS())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('assets'));
});

//compile vendor JS
var lib=[
    "./node_modules/jquery/dist/jquery.js",
    "./node_modules/bootstrap/dist/js/bootstrap.bundle.js",
    "./node_modules/@cmyee/pushy/js/pushy.js",
    './node_modules/owl.carousel/dist/owl.carousel.js',
    './src/js/puymodals.js'
];
gulp.task('create_vendor_js',function(){
    return gulp.src(lib)
        .pipe(concat("vendor.js"))
        .pipe(uglify())
        .pipe(gulp.dest('assets/js'));
});

//compile bzintl app.js
gulp.task('create_app_js',function(){
    return gulp.src('src/js/app.js')
        .pipe(gulp.dest('assets/js'));
});


//setting up font awesome fonts
gulp.task('copy_fa_fonts',function(){
    return gulp.src('./node_modules/@fortawesome/fontawesome-free/webfonts/*')
        .pipe(gulp.dest('assets/webfonts'));
})

//copying homepage assets
gulp.task('homepage_assets',function(){

    gulp.src(['./node_modules/fullpage.js/dist/fullpage.min.css','src/scss/homepage.scss',])
        .pipe(concat('frontpage.scss'))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('assets/homepage'));

    return gulp.src([
        './node_modules/fullpage.js/dist/fullpage.min.js'
    ]).pipe(gulp.dest('assets/homepage'));
});

gulp.task('copy_htmls',function(){
    return gulp.src('src/*.html')
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./'));
})


//watching files
gulp.task('default',gulp.series('create_css','create_vendor_js','create_app_js','copy_fa_fonts','homepage_assets','copy_htmls'));
//gulp.task('default',['create_css','create_vendor_js','create_app_js','copy_fa_fonts','homepage_assets']);



function watchFiles() {
    gulp.watch('src/js/*.js',gulp.series('create_app_js'));
    gulp.watch('src/scss/*.scss',gulp.series('create_css','homepage_assets'));
    gulp.watch(['src/*.html','src/html_parts/*.html'],gulp.series('copy_htmls'));
  }
const watch = gulp.parallel(watchFiles);

exports.watch = watch;