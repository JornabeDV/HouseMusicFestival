const { src, dest, watch, parallel } = require('gulp');

//CSS

const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

//Images

const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css ( done ) {
    src('src/scss/**/*.scss') // 1.File SASS identification.  
    .pipe( sourcemaps.init())
    .pipe( plumber())
    .pipe( sass())  // 2.Compilation.
    .pipe( postcss([ autoprefixer(), cssnano() ]) )
    .pipe(sourcemaps.write('.'))
    .pipe( dest('build/css'))  // 3.Store it on the hard drive.

    done(); // 4.Callback that notifies gulp when we reach the end of the function execution.
}

function images ( done ) {

    const opciones = {
        optimizationLevel: 3    
    };
    src ( 'src/img/**/*.jpg' )
        .pipe( cache(imagemin(opciones) ) ) 
        .pipe( dest('build/galeria/img') ) 

    done();
}

function versionWebp ( done ) {

    const opciones = {
        quality: 50
    };

    src ( 'src/img/**/*.jpg' )
        .pipe( webp(opciones) )
        .pipe( dest('build/galeria/img') )
        
    done();
}

function versionAvif ( done ) {

    const opciones = {
        quality: 50
    };

    src ( 'src/img/**/*.jpg' )
        .pipe( avif(opciones) )
        .pipe( dest('build/galeria/img') )
        
    done();
}
    
function javascript ( done ) {
    src ( 'src/js/**/*.js' )
        .pipe( dest('build/js') )
    
    done();
}

function dev ( done )  {
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', javascript);

    done(); 
}

exports.css = css; 
exports.js = javascript;  
exports.images = images;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel ( images, versionWebp, versionAvif, javascript, dev ); 
