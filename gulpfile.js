var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var serveStatic = require('serve-static');

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

	browserSync.init({
		open: false,
		proxy: "192.168.1.1", // Tomato router address
		middleware: serveStatic('./css'),
		rewriteRules: [
			{
				// Append stylesheet to head
				match: /<\/head>/g,
				fn: function(matched) { return '<link rel="stylesheet" type="text/css" href="theme.css"></head>' }
			}
		]
	});

	gulp.watch("scss/**/*.scss", ['sass']);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
	return gulp.src("scss/*.scss")
		.pipe(sass())
		.pipe(gulp.dest("css"))
		.pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
