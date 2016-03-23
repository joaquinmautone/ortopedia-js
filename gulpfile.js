 
// get the dependencies
var gulp        = require('gulp'), 
  childProcess  = require('child_process'), 
  electron      = require('electron-prebuilt');

// create the gulp task
gulp.task('default', function () { 
  childProcess.spawn(electron, ['./'], { stdio: 'inherit' });   
});
