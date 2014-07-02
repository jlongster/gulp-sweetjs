
# gulp-sweetjs

This lets you integrate [sweet.js](http://sweetjs.org/) with gulp.

Example (also uses [gulp-sourcemaps](https://github.com/floridoo/gulp-sourcemaps)):

```js
gulp.task("build", function() {
  gulp.src("src/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(sweetjs({
      modules: ['es6-macros'],
      readtables: ['reader-module']
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build'));
})
```