var gulp = require('gulp');
var iconfont = require('gulp-iconfont');
var consolidate = require('gulp-consolidate');
var _ = require("underscore")

String.prototype.prettyfy = function(){
  return this.replace(".", "").replace(" ","-").replace("+","plus")
    .toLowerCase()
}

gulp.task('Iconfont', function(){
  gulp.src(['icons/*.svg'])
    .pipe(iconfont({
      normalize: true,
      fontHeight: 1001,  
      fontName: 'pinicons' 
    }))
    .on('codepoints', function(codepoints, options) {
      var o = {
          glyphs: codepoints.map(function(glyph){
            var ret = _.clone(glyph);
            ret.name = ret.name.prettyfy();
            return ret;
          }),
          fontName: 'pinicons',
          fontPath: '../fonts/',
          className: 'pico'      
      }
      gulp.src('templates/pico.css')
        .pipe(consolidate('lodash', o))
        .pipe(gulp.dest('www/css/'));
        // Create HTML preview
        gulp.src('templates/pico.html')
            .pipe(consolidate('lodash', {
                glyphs: o.glyphs, 
                fontName: o.fontName,
                className: o.className
            }))
            .pipe(gulp.dest('www/'));
    })
    .pipe(gulp.dest('www/fonts/'));
});


