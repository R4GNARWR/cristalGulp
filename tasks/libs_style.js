const plugins = [
  'node_modules/bootstrap/scss/bootstrap.scss',
  'node_modules/swiper/swiper-bundle.min.css',
  'node_modules/animate.css/animate.min.css',
  'src/libs/ionRangeSlider/ion.rangeSlider.min.css',
  'node_modules/@fancyapps/ui/dist/fancybox/fancybox.css',
];

const {
  src,
  dest
} = require('gulp');

const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const map = require('gulp-sourcemaps');
const chalk = require('chalk');

module.exports = function libs_style(done) {
  if (plugins.length > 0) {
    return src(plugins)
      .pipe(map.init())
      .pipe(sass({
        outputStyle: 'expanded'
      }).on('error', sass.logError))
      .pipe(concat('libs.min.css'))
      .pipe(map.write('../sourcemaps/'))
      .pipe(dest('build/css/'))
  } else {
    return done(console.log(chalk.bgYellow(`${chalk.bold('WARNING!')} You did not add any CSS/SCSS plugins.`)));
  }
}