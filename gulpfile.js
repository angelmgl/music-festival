const { src, dest, series, watch } = require("gulp");
const imagemin = require("gulp-imagemin");
const notify = require("gulp-notify");
const webp = require("gulp-webp");
const concat = require("gulp-concat");
const rename = require("gulp-rename");
//const sass = require("gulp-sass");

// CSS utilities
//doesn't work without gulp-sass
//const autoprefixer = require("autoprefixer");
//const postcss = require("gulp-postcss");
//const cssnano = require("cssnano");
const sourcemaps = require("gulp-sourcemaps");

//sourcemaps guarda la referencia original de los archivos minificados
//para poder leer la consola incluso con el código minificado

// JS utilities
const terser = require("gulp-terser-js");

const paths = {
    img: "src/img/**/*",
    scss: "./src/scss/app.scss",
    js: "src/js/**/*.js",
};

//compile and minify sass
/*function css() {
    return src(paths.scss)
        .pipe(sourcemaps.init()) 
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write())
        .dest("./build/css");
}*/

//listening changes
function watchFiles() {
    //watch("src/scss/app.scss", css);
    watch(paths.js, javascript);
}

// this function compress image
function images() {
    return src(paths.img)
        .pipe(imagemin())
        .pipe(dest("./build/img"))
        .pipe(notify({ message: "Image minified" }));
}

// this function convert images to webp
function towebp() {
    return src(paths.img)
        .pipe(webp())
        .pipe(dest("./build/img"))
        .pipe(notify({ message: "Converted to webp" }));
}

//minify javascript code
function javascript() {
    return src(paths.js)
        .pipe(sourcemaps.init())
        .pipe(concat("bundle.js"))
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(rename({suffix: ".min"}))
        .pipe(dest("./build/js"));
}

//exports.css = css;
exports.watchFiles = watchFiles;
exports.images = images;
exports.towebp = towebp;
exports.javascript = javascript;

exports.default = series(javascript, images, towebp, watchFiles);
