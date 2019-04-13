const gulp = require("gulp");
const browserify = require("browserify");
const watchify = require("watchify");
const errorify = require("errorify");
const del = require("del");
const tsify = require("tsify");
const source = require("vinyl-source-stream");
const sass = require("gulp-sass");
const ts = require("gulp-typescript");

sass.compiler = require("node-sass");

var tsProject = ts.createProject("tsconfig.json");
var tsBrowserProject = ts.createProject("js/browser-tsconfig.json");

function createBrowserifier(entry) {
    return browserify({
            basedir: '.',
            debug: true,
            entries: [entry],
            cache: {},
            packageCache: {}
        })
        .plugin(tsify)
        .plugin(watchify)
        .plugin(errorify);
}

function bundle(browserifier, bundleName, destination) {
    return browserifier
        .bundle()
        .pipe(source(bundleName))
        .pipe(gulp.dest(destination));
}

gulp.task("sass", () => {
    return gulp.src("./assets/css/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./dist/assets/css"));
});

gulp.task("sass:watch", () => {
    gulp.watch("./assets/css/*.scss", gulp.series("sass"));
});

// Electron app.
gulp.task("typescript", () => {
    return gulp.src('src/**/*.ts')
        .pipe(tsProject())
        .pipe(gulp.dest('dist'));
});

gulp.task("typescript:watch", () => {
    gulp.watch("src/**/*.ts", gulp.series("typescript"));
});

// Renderer.
gulp.task("typescript:renderer", () => {
    return gulp.src('js/**/*.ts')
        .pipe(tsBrowserProject())
        .pipe(gulp.dest('dist/js'));
});

gulp.task("typescript:renderer:watch", () => {
    gulp.watch("js/**/*.ts", gulp.series("typescript:renderer"));
});

// Browserify/bundle.
gulp.task("tsc-browserify-src", () => {
    return bundle(
        createBrowserifier("./dist/js/renderer.js"),
        "bundle.js",
        "dist/browserified"
    );
});

gulp.task("tsc-browserify-src:watch", () => {
    gulp.watch("dist/js/**/*.js", gulp.series("tsc-browserify-src"));
})

// Clean.
gulp.task("clean", () => {
    return del("./dist/**/*");
});

// Default task.
gulp.task("default", gulp.series("clean", "sass", "typescript", "typescript:renderer", "tsc-browserify-src", gulp.parallel("sass:watch", "typescript:watch", "typescript:renderer:watch", "tsc-browserify-src:watch"), (done) => {

}));