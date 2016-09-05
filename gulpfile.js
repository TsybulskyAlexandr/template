var gulp = require('gulp'),
	connect = require('gulp-connect'),
	jade = require('gulp-jade'),
	compass = require('gulp-compass'),
	imagemin = require('gulp-imagemin');

gulp.task('connect', function(){
	connect.server({
		root: 'public',
		livereload: true
});
	});

gulp.task('watch', function () {
	gulp.watch('app/**/*.jade',['jade']),
	gulp.watch('app/styles/**/*', ['compass']),
	gulp.watch('app/img/**/*', ['imagemin']),
	gulp.watch('app/scripts/**/*.js', ['js']);
});

gulp.task('jade', function () {
	gulp.src(['./app/templates/pages/*.jade' , '!./app/templates/**/_*.jade'])
	.pipe(jade({pretty: true}))
	.pipe(gulp.dest('public/'))
	.pipe(connect.reload());
});

gulp.task('compass', function(){
	gulp.src(['./app/styles/*.sass', '!./app/styles/lib/_*.sass'])
	.pipe(compass({
		config_file: './config.rb',
		http_path: "/",
		style: 'expanded',
		css: "public/css",
		sass: "app/styles",
		image: "public/img/",
	}))	
	.pipe(gulp.dest('./public/css/'))	
	.pipe(connect.reload());
});

gulp.task('js', function() {
    gulp.src(['app/scripts/**/*.js'])
        .pipe(gulp.dest('public/js'))
        .pipe(connect.reload());
});

gulp.task('imagemin', function() {
    gulp.src('app/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('public/img'))
        .pipe(connect.reload());
});

gulp.task('copyFonts', function () {
    gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('public/fonts'))
    .pipe(connect.reload());
});

gulp.task('default', ['connect', 'jade', 'compass', 'js', 'imagemin', 'coppyfonts', 'watch']);