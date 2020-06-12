// 实现这个项目的构建任务
const gulp = require('gulp')
const del = require('del')
const browserSync = require('browser-sync').create()
const plugins = require('gulp-load-plugins')()
const reload = browserSync.reload
const config = require('./config')

// 清空
const clean = () => {
  return del(['temp', 'dist'])
}

// lint
const lint = () => {

}

// style编译
const style = () => {
  return gulp.src('src/assets/styles/*.scss', { base: 'src' })
    .pipe(plugins.sass({ outputStyle: 'expanded' }).on('error', plugins.sass.logError))
    .pipe(gulp.dest('temp'))
    .pipe(reload({ stream: true }));
}

// script编译
const script = () => {
  return gulp.src('src/assets/scripts/*.js', { base: 'src' })
    .pipe(plugins.babel({
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest('temp'))
    .pipe(reload({ stream: true }));
}

// html编译

const html = () => {

  return gulp.src('src/*.html', { base: 'src' })
    .pipe(plugins.swig({
      defaults: { cache: false },
      data: config
    }))
    .pipe(gulp.dest('temp'))
    .pipe(reload({ stream: true }));
}

// images及font优化
const image = () => {
  return gulp.src('src/assets/images/**', { base: 'src' })
    .pipe(plugins.imagemin())
    .pipe(gulp.dest('dist'))
}

const font = () => {
  return gulp.src('src/assets/fonts/**', { base: 'src' })
    .pipe(plugins.imagemin())
    .pipe(gulp.dest('dist'))
}

// 公共资源复制
const extra = () => {
  return gulp.src('public/**', { base: 'public' })
    .pipe(gulp.dest('dist'))
}

// serve
const serve = () => {
  browserSync.init({
    notify: false,
    server: {
      baseDir: ["temp", "src", 'public'], //静态服务器基础服务路径
      routes: {
        "/node_modules": "node_modules"
      }
    }
  });
  // 监听资源变化
  gulp.watch('src/assets/styles/*.scss', style)
  gulp.watch('src/assets/scripts/*.js', script)
  gulp.watch('src/*.html', html)
}

// compile
const compile = gulp.parallel(html, style, script)

// useref 对html资源及引用资源处理
const useref = () => {
  return gulp.src('temp/*.html')
    .pipe(plugins.useref({ searchPath: ['temp', '.'] }))
    .pipe(plugins.if('*.js', plugins.uglify()))
    .pipe(plugins.if('*.css', plugins.cleanCss()))
    .pipe(plugins.if('*.html', plugins.htmlmin({
      collapseWhitespace: true, minifyCSS: true,
      minifyJS: true
    })))
    .pipe(gulp.dest('dist'));
}


// start
const start = gulp.series(compile, serve)
// build
const build = gulp.series(compile, gulp.parallel(useref, image, font, extra))
// deploy
const deploy = () => {

}
module.exports = {
  clean,
  lint,
  image,
  font,
  serve,
  build,
  start,
  deploy
}
