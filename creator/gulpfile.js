var gulp = require('gulp');
var path = require('path');
// clean
var clean = require('gulp-clean');
// concat
var concat = require('gulp-concat');
// rename
var rename = require("gulp-rename");

// js
var jshint = require('gulp-jshint');
var sourcemaps = require('gulp-sourcemaps');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');

// html
var htmlreplace = require('gulp-html-replace');

// md5
var rev = require('gulp-rev');

// browser
var browserSync = require('browser-sync').create();

// config
var config = { // gulp --mode local --dist ./dist --min -- port 3000
  mode: gulp.env.mode || 'local', // local内网,remote外网
  dist: gulp.env.dist || './dist', // 发布目录
  min: gulp.env.min || false, // 是否使用min文件
  port: gulp.env.port || 3000, // watch监控端口
  temp: {　 // 临时变量
    // js-cdn
    // js-assets
    // js-app
    // js-angular

    // css-cdn
    // css-assets
    // css-app

  }
}

// 临时保存
function tempSave(key, path) {

  // 获取文件名
  var basename = path.basename;
  // 输出信息
  // console.log(key, basename);
  // 如果使用min,添加min后缀
  if (config.min) {
    basename += '.min';
  }
  // 配置
  config.temp[key] = basename;
}


////////////////////////////////////////
///////////////// 开发 /////////////////
////////////////////////////////////////
// dev
gulp.task('dev', function (cb) {

  browserSync.init({
    port: config.port, // 端口
    server: {
      baseDir: ['./src'], // 主目录
      index: "index.html", // 主页
      routes: { // 路由
        "/bower_components": "bower_components",
        '/favicon.ico': 'favicon.ico'
      }
    },
    startPath: "./" // 启动路径
  });

  // 文件改变时重新加载
  gulp.watch('./src/**/*').on('change', browserSync.reload);

  return cb();

});

////////////////////

// clean
gulp.task('clean', function () {
  return gulp.src(config.dist, {
      read: false
    })
    .pipe(clean({
      force: true
    }));
});

// js - cdn
gulp.task('js:cdn', function () {
  return gulp.src([
      './bower_components/jquery/dist/jquery.js',
      './bower_components/bootstrap/dist/js/bootstrap.js',
      './bower_components/angular/angular.js',
      './bower_components/angular-ui-router/release/angular-ui-router.js',
      './bower_components/angular-animate/angular-animate.js',
      './bower_components/angular-cookies/angular-cookies.js',
      './bower_components/angular-resource/angular-resource.js',
      './bower_components/angular-sanitize/angular-sanitize.js',
      './bower_components/angular-touch/angular-touch.js',
    ])
    .pipe(concat('cdn.js'))
    .pipe(rev())
    .pipe(rename(function (path) {
      tempSave('js-cdn', path);
    }))
    .pipe(gulp.dest(path.join(config.dist, 'js')))
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(rename(function (path) {
      path.basename += ".min";
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.join(config.dist, 'js')));
});

// js - assets
gulp.task('js:assets', function () {
  return gulp.src([
      './bower_components/oclazyload/dist/ocLazyLoad.js',
      './bower_components/ngstorage/ngStorage.js',
      './bower_components/angular-bootstrap/ui-bootstrap-tpls.js'
    ])
    .pipe(concat('assets.js'))
    .pipe(rev())
    .pipe(rename(function (path) {
      tempSave('js-assets', path);
    }))
    .pipe(gulp.dest(path.join(config.dist, 'js')))
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(rename(function (path) {
      path.basename += ".min";
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.join(config.dist, 'js')));
});

// js - app
gulp.task('js:app', function () {
  return gulp.src([
      // 其他js文件
      './src/js/**/*'
    ])
    .pipe(concat('app.js'))
    .pipe(rev())
    .pipe(rename(function (path) {
      tempSave('js-app', path);
    }))
    .pipe(gulp.dest(path.join(config.dist, 'js')))
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(rename(function (path) {
      path.basename += ".min";
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.join(config.dist, 'js')));
});

// js - angular
gulp.task('js:angular', function () {
  return gulp.src([
      // angular 测试
      '!./src/app/test/**/*',
      '!./src/app/**/*.test.js',

      // angular 
      './src/app/**/*.module.js', // module
      './src/app/**/*.provider.js', // provider
      './src/app/**/*.factory.js', // factory
      './src/app/**/*.service.js', // service
      './src/app/**/*.controller.js', // controller
      './src/app/**/*.interceptor.js', // interceptor
      './src/app/**/*.config.js', // config
      './src/app/**/*.router.js' // router

    ])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('angular.js'))
    .pipe(rev())
    .pipe(rename(function (path) {
      tempSave('js-angular', path);
    }))
    .pipe(ngAnnotate())
    .pipe(gulp.dest(path.join(config.dist, 'js')))
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(rename(function (path) {
      path.basename += ".min";
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.join(config.dist, 'js')));
});

// fonts
gulp.task('fonts', function () {
  return gulp.src([
      './bower_components/bootstrap/dist/fonts/**/*',
      './bower_components/font-awesome/fonts/**/*',
      './bower_components/simple-line-icons/fonts/**/*',
      './src/fonts/**/*'
    ])
    .pipe(gulp.dest(path.join(config.dist, 'fonts')));
});


// css - cdn
gulp.task('css:cdn', function () {
  return gulp.src([
      './bower_components/bootstrap/dist/css/bootstrap.css',
      './bower_components/font-awesome/css/font-awesome.css',
      './bower_components/simple-line-icons/css/simple-line-icons.css'
    ])
    .pipe(concat('cdn.css'))
    .pipe(rev())
    .pipe(rename(function (path) {
      tempSave('css-cdn', path);
    }))
    .pipe(gulp.dest(path.join(config.dist, 'css')))
    .pipe(sourcemaps.init())
    .pipe(rename(function (path) {
      path.basename += ".min";
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.join(config.dist, 'css')));
});

// css - assets
gulp.task('css:assets', function () {
  return gulp.src([])
    .pipe(concat('assets.css'))
    .pipe(rev())
    .pipe(rename(function (path) {
      tempSave('css-assets', path);
    }))
    .pipe(gulp.dest(path.join(config.dist, 'css')))
    .pipe(sourcemaps.init())
    .pipe(rename(function (path) {
      path.basename += ".min";
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.join(config.dist, 'css')));
});

// css - app
gulp.task('css:app', function () {
  return gulp.src([
      './src/css/**/*.css'
    ])
    .pipe(concat('app.css'))
    .pipe(rev())
    .pipe(rename(function (path) {
      tempSave('css-app', path);
    }))
    .pipe(gulp.dest(path.join(config.dist, 'css')))
    .pipe(sourcemaps.init())
    .pipe(rename(function (path) {
      path.basename += ".min";
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.join(config.dist, 'css')));

});

// image
gulp.task('image', function () {
  return gulp.src([
      './src/img/**/*'
    ])
    .pipe(gulp.dest(path.join(config.dist, 'img')));
});

// tpl
gulp.task('tpl', function () {
  return gulp.src(
      ['./src/tpl/**/*']
    )
    .pipe(gulp.dest(path.join(config.dist, 'tpl')));
});

// index(html)
gulp.task('index', ['js:cdn', 'js:assets', 'js:app', 'js:angular', 'css:cdn', 'css:assets', 'css:app'], function (cb) {

  var replaces;

  if (config.mode) { // 本地
    replaces = {
      // css
      'css-cdn': './css/' + config.temp['css-cdn'] + '.css',
      'css-assets': './css/' + config.temp['css-assets'] + '.css',
      'css-app': './css/' + config.temp['css-app'] + '.css',
      // js
      'js-cdn': './js/' + config.temp['js-cdn'] + '.js',
      'js-assets': './js/' + config.temp['js-assets'] + '.js',
      'js-app': './js/' + config.temp['js-app'] + '.js',
      'js-angular': './js/' + config.temp['js-angular'] + '.js'
    }
  } else { // 远程
    replaces = {
      // css
      'css-cdn': [
        '//cdn.bootcss.com/bootstrap/3.3.6/css/bootstrap.min.css',
        '//cdn.bootcss.com/font-awesome/4.5.0/css/font-awesome.min.css',
        '//cdn.bootcss.com/simple-line-icons/2.2.4/css/simple-line-icons.min.css'
      ],
      'css-assets': './css/' + config.temp['css-assets'] + '.css',
      'css-app': './css/' + config.temp['css-app'] + '.css',
      // js
      'js-cdn': [
        '//cdn.bootcss.com/jquery/2.2.2/jquery.min.js',
        '//cdn.bootcss.com/bootstrap/3.3.6/js/bootstrap.min.js',
        '//cdn.bootcss.com/angular.js/1.5.3/angular.min.js',
        '//cdn.bootcss.com/angular-ui-router/0.2.18/angular-ui-router.min.js',
        "//cdn.bootcss.com/angular.js/1.5.3/angular-animate.min.js",
        "//cdn.bootcss.com/angular.js/1.5.3/angular-cookies.min.js",
        "//cdn.bootcss.com/angular.js/1.5.3/angular-resource.min.js",
        "//cdn.bootcss.com/angular.js/1.5.3/angular-sanitize.min.js",
        "//cdn.bootcss.com/angular.js/1.5.3/angular-touch.min.js",
      ],
      'js-assets': './js/' + config.temp['js-assets'] + '.js',
      'js-app': './js/' + config.temp['js-app'] + '.js',
      'js-angular': './js/' + config.temp['js-angular'] + '.js'
    }
  }

  gulp.src('./src/index.html') // index
    .pipe(htmlreplace(replaces))
    .pipe(gulp.dest(config.dist));

  return cb();
});

////////////////////////////////////////
///////////////// 发布 /////////////////
////////////////////////////////////////

// publish
gulp.task('publish', ['js:cdn', 'js:assets', 'js:app', 'js:angular', 'css:cdn', 'fonts', 'css:assets', 'css:app', 'image', 'tpl', 'index'], function (cb) {

  return cb();
});

// watch
gulp.task('watch', function () {

  browserSync.init({
    port: config.port, // 端口
    server: {
      baseDir: [config.dist], // 主目录
      index: "index.html", // 主页
      routes: { // 路由
        // "/bower_components": "bower_components",
        // '/favicon.ico': 'favicon.ico'
      }
    }
  });

  // 文件改变时重新加载
  gulp.watch('./src/app/**/*', ['js:angular']).on('change', browserSync.reload);
  gulp.watch('./src/js/**/*', ['js:app']).on('change', browserSync.reload);
  gulp.watch('./src/css/**/*', ['css:app']).on('change', browserSync.reload);
  gulp.watch('./src/img/**/*', ['image']).on('change', browserSync.reload);
  gulp.watch('./src/tpl/**/*', ['tpl']).on('change', browserSync.reload);

});

// default
gulp.task('default', ['clean'], function () {
  gulp.start('publish');
  gulp.start('watch');
});