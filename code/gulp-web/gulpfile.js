// 实现这个项目的构建任务
const gulp = require('gulp')
const del = require('del')
const plugins = require('gulp-load-plugins')()

// 清空
const clean = () => {
  return del(['temp', 'dist'])
}

// lint
const lint = () => {

}

// style编译
const css = () => {
  return gulp.src('src/assets/styles/**.scss', { base: 'src'})
    .pipe(plugins.sass())
    .pipe(gulp.dest('temp'))
}

// script编译
const script = () => {
  gulp.src('src/assets/scripts/**.js', { base: 'src' })
    .pipe(plugins.babel())
    .pipe(gulp.dest('temp'))
}

// html编译

const html = () => {

}

// serve
const serve = () => {

}

// build
const build = () => {

}

// start
const start = () => {

}
// deploy
const deploy = () => {

}
module.exports = {
  clean,
  lint,
  css,
  script,
  serve,
  build,
  start,
  deploy
}
