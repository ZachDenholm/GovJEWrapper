var gulp = require('gulp');
var webserver = require('gulp-webserver');
var headerfooter = require('gulp-headerfooter');
var sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
var concat = require('gulp-concat');  
var rename = require('gulp-rename');  
var uglify = require('gulp-uglify');  

gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: 'http://localhost:8000/public/',
      fallback: 'form.html'
    }));
});



gulp.task('headerfooter', function () {
    gulp.src('./content/*.html')
        .pipe(headerfooter.header('./partials/_header.html'))
        .pipe(headerfooter.footer('./partials/_footer.html'))
        .pipe(gulp.dest('./public/'));
});

gulp.task('scss', function() {
    gulp.src('./scss/**/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});

gulp.task('images', () =>
    gulp.src('./images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./public/images'))
);

gulp.task('scripts', function() {  
    return gulp.src('./js/**/*.js')
        .pipe(concat('GovJE.js'))
        .pipe(gulp.dest('./public/js'))
        .pipe(rename('GovJE.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./public/js'));
});

gulp.task('default', function() {
    gulp.start('webserver');
    gulp.watch('./images/*', ['images']); 
    gulp.watch('./content/*.html', ['headerfooter']); 
    gulp.watch('./scss/**/*.scss', ['scss']); 
    gulp.watch('./js/**/*.js', ['scripts']); 
});