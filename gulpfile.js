const { src, dest, series, watch } = require("gulp");
const imagemin = require("gulp-imagemin");
const notify = require("gulp-notify");
const webp = require("gulp-webp");
const concat = require("gulp-concat");
/* const sass = require('gulp-sass'); */

const paths = {
    img: "src/img/**/*",
    js: "src/js/**/*.js"
}

//compile sass
/* function css() {
    return src("./src/scss/app.scss")
        .pipe(sass())
        .dest("./build/css")
} */

//minify css code
/* function minCss() {
    return src("./src/scss/app.scss")
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .dest("./build/css")
} */

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
        .pipe(concat('bundle.js'))
        .pipe(dest("./build/js"));
}

/* exports.css = css;
exports.minCss = minCss;*/
exports.watchFiles = watchFiles; 
exports.images = images;
exports.towebp = towebp;
exports.javascript = javascript;

exports.default = series( javascript, images, towebp, watchFiles );