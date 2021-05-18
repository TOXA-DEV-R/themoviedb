const gulp = require("gulp"),
  sass = require("gulp-sass"),
  autoprefixer = require("gulp-autoprefixer"),
  csso = require("gulp-csso"),
  rename = require("gulp-rename"),
  gcmq = require("gulp-group-css-media-queries");
sass.compiler = require("node-sass");
const sourcemaps = require("gulp-sourcemaps");

gulp.task("sass", function () {
  return gulp
    .src("./scss/*.scss")
    .pipe(
      sass({
        errLogToConsole: true,
        outputStyle: "expanded",
        sourceComments: "map",
      })
    )
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 9 versions"],
        cascade: false,
      })
    )
    .pipe(gcmq())
    .pipe(gulp.dest("css"))
    .pipe(csso())
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("css"));
});

gulp.task("asass", function () {
  return gulp.watch(["./scss/*.scss", "./scss/*.scss"], gulp.parallel("sass"));
});
