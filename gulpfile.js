var gulp=require('gulp');
var sass=require('gulp-sass');
var concat = require("gulp-concat");
var uglifyCSS=require('gulp-uglifycss');
var uglify = require('gulp-uglify');

//create CSS
gulp.task('create_css',function(){
    gulp.src(['src/scss/style.scss','./node_modules/owl.carousel/dist/assets/owl.carousel.css'])
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('style.css'))
        .pipe(uglifyCSS())
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
    gulp.src(lib)
        .pipe(concat("vendor.js"))
        .pipe(uglify())
        .pipe(gulp.dest('assets/js'));
});

//compile bzintl app.js
gulp.task('create_app_js',function(){
    gulp.src('src/js/app.js')
        .pipe(gulp.dest('assets/js'));
});


//setting up font awesome fonts
gulp.task('copy_fa_fonts',function(){
    gulp.src('./node_modules/@fortawesome/fontawesome-free/webfonts/*')
        .pipe(gulp.dest('assets/webfonts'));
})

//copying homepage assets
gulp.task('homepage_assets',function(){

    gulp.src(['./node_modules/fullpage.js/dist/fullpage.min.css','src/scss/homepage.scss',])
        .pipe(concat('frontpage.scss'))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('assets/homepage'));

    gulp.src([
        './node_modules/fullpage.js/dist/fullpage.min.js'
    ]).pipe(gulp.dest('assets/homepage'));
});


//watching files
gulp.task('default',['create_css','create_vendor_js','create_app_js','copy_fa_fonts','homepage_assets']);

gulp.task('watch',function(){
    gulp.watch('src/scss/*.scss',['create_css','homepage_assets']);
});