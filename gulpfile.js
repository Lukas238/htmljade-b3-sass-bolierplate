var gulp = require('gulp'),
	plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    header  = require('gulp-header'),
    rename = require('gulp-rename'),
    minifyCSS = require('gulp-minify-css'),
	imagemin    = require('gulp-imagemin'),
	jade        = require('gulp-jade'),
	notifier = require('node-notifier'),
	styledocco = require('gulp-styledocco'),
	concat = require('gulp-concat'),
	sourcemaps = require('gulp-sourcemaps'),
	fs = require('fs'),
	path = require('path'),
	glob = require('glob'),
	package = require('./package.json');
	


// error function for plumber
var onError = function (err) {
	console.log(err);
};

var config = {
	src: './sources',
	dist: './dist',
	bowerPath: './sources/vendors'
}

var banner = [
  '/*!\n' +
  ' * <%= package.title %>\n' +
  ' * <%= package.url %>\n' +
  ' * @author <%= package.author %>\n' +
  ' * @version <%= package.version %>\n' +
  ' * Copyright ' + new Date().getFullYear() + '. <%= package.license %> licensed.\n' +
  ' */',
  '\n'
].join('');




// Import the whole directory with @import "somedir/all";
gulp.task('sass-includes', function (callback) {
	var all = '_all.scss';
	glob(config.src+'/scss/**/' + all, function (error, files) {
		files.forEach(function (allFile) {
			// Add a banner to warn users
			fs.writeFileSync(allFile, '/** This is a dynamically generated file **/\n\n');
			var directory = path.dirname(allFile);
			var partials = fs.readdirSync(directory).filter(function (file) {
				return (
					// Exclude the dynamically generated file
					file !== all &&
					// Only include _*.scss files
					path.basename(file).substring(0, 1) === '_' &&
					path.extname(file) === '.scss'
				);
			});

			// Append import statements for each partial
			partials.forEach(function (partial) {
				fs.appendFileSync(allFile, '@import "' + partial + '";\n');
			});
		});
	});
	callback();
});



gulp.task('html', function () {
	
	/* HTML */
	gulp.src(config.src+'/*.html')
	.pipe(gulp.dest(config.dist));
	
	/* JADE */
	gulp.src([config.src+'/*.jade', '!'+config.src+'/_*.jade'])
    .pipe(jade({
		pretty: true
		}
	))
	.pipe(gulp.dest(config.dist))
	.pipe(browserSync.reload({stream:true}));
});

gulp.task('css', ['sass-includes'], function () {
	
	gulp.src(config.src+'/scss/styles.scss')
	.pipe(sourcemaps.init())
	.pipe(sass({errLogToConsole: true}))
	.pipe(autoprefixer('last 4 version'))
	//.pipe(header(banner, { package : package }))
	.pipe(gulp.dest(config.dist+'/css'))
	.pipe(minifyCSS())
	.pipe(rename({ suffix: '.min' }))
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest(config.dist+'/css'))
	.pipe(browserSync.reload({stream:true}));
	
});

//compressing images & handle SVG files
gulp.task('images_optimize', function(tmp) {
    return gulp.src([config.src+'/images/*.jpg', config.src+'/images/*.png'])
    .pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
	.pipe(gulp.dest(config.dist+'/images'));
});

//compressing images & handle SVG files
gulp.task('images', ['images_optimize'], function() {
    gulp.src(config.src+'/images/**/*')
        .pipe(gulp.dest(config.dist+'/images'));
});


gulp.task('fonts' ,function () {
    gulp.src(config.src+'/fonts/*')
    .pipe(gulp.dest(config.dist+'/fonts'));
});

gulp.task('vendors', function(){

    //SCRIPTS
	gulp.src([
		config.bowerPath+'/jquery/dist/jquery.js',
		config.bowerPath+'/bootstrap-sass-official/assets/javascripts/bootstrap.js',
		config.bowerPath+'/slick-carousel/slick/slick.js'
	])
	.pipe(concat('vendors.js', {newLine: ';'}))
    .pipe(gulp.dest(config.dist+'/js/'))
	.pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(config.dist+'/js/'));

	//STYLES
    gulp.src([
		//config.bowerPath+'/bootstrap/dist/css/bootstrap.css',
		config.bowerPath+'/font-awesome/css/font-awesome.min.css',
		config.bowerPath+'/slick-carousel/slick/slick.css',
		config.bowerPath+'/slick-carousel/slick/slick-theme.css'
	])
	.pipe(concat('vendors.css'))
    .pipe(gulp.dest(config.dist+'/css'))
	.pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(config.dist+'/css'));
	
	//FONTS
    gulp.src([
		config.bowerPath+'/bootstrap-sass-official/assets/fonts/bootstrap/*',
		config.bowerPath+'/font-awesome/fonts/*',
		config.bowerPath+'/slick-carousel/slick/fonts/*'
	])
	.pipe(gulp.dest(config.dist+'/fonts/'));
	
	/* MISC */
	gulp.src([
		config.bowerPath+'/slick-carousel/slick/*.gif'
	])
    .pipe(gulp.dest(config.dist+'/css/'));    
	
});


gulp.task('extra',function(){
	/* EXTRA FILES*/
	gulp.src([
		config.src+'/favicon.ico'
	])
    .pipe(gulp.dest(config.dist));    
});


gulp.task('js',function(){
  gulp.src(config.src+'/js/scripts.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(header(banner, { package : package }))
    .pipe(gulp.dest(config.dist+'/js'))
    .pipe(uglify())
    .pipe(header(banner, { package : package }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(config.dist+'/js'))
    .pipe(browserSync.reload({stream:true, once: true}));
});



// CSS COMPONENTS DOCUMENTATION
gulp.task('styledocco', function () {
	
	gulp.src(config.src+'/fonts/*')
    .pipe(gulp.dest('docs/fonts'));
	
	gulp.src( config.src+'/scss/components/*!(_all).scss' )
	.pipe(styledocco({
		out: 'docs',
		name: package.name,
		include: [
			config.dist+'/css/vendors.min.css',
			config.dist+'/css/styles.min.css',
			config.dist+'/js/vendors.min.js',
			config.dist+'/js/scripts.min.js'
		],
		'no-minify': true
	}));
});



gulp.task('browser-sync', function() {
    browserSync.init(null, {
        server: {
            baseDir: 'dist'
        }
    });
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('default', ['css', 'fonts', 'vendors', 'js', 'html', 'images', 'extra', 'browser-sync'], function () {
    gulp.watch([config.src+'/scss/*.scss', config.src+'/scss/**/*.scss'], ['css']);
    gulp.watch(config.src+'/js/*.js', ['js']);
    gulp.watch(config.src+'/**/*.+(html|jade)', ['html', 'bs-reload']);
	
	notifier.notify({
		title: package.name,
		message: 'Server running',
		time: 5000
	});
});

gulp.task('docs', [ 'vendors', 'css', 'fonts', 'js', 'styledocco'], function () {
	gulp.watch(config.src+'/scss/*.scss', ['css', 'styledocco']);
    gulp.watch(config.src+'/js/*.js', ['js', 'styledocco']);
	browserSync.init(null, {
        server: {
            baseDir: 'docs'
        }
    });
});

gulp.task('build', ['vendors', 'css', 'fonts', 'js', 'html', 'images', 'extra'], function () {
	notifier.notify({
		title: package.name,
		message: 'Build ready',
		time: 5000
	});
});