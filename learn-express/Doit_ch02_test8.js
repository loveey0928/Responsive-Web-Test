var path = require('path');

// var directories = ['users', 'mike', 'docs'];
// var docsDirectory = directories.join(path.sep);
// console.log('문서 디렉터리 : %s', docsDirectory);

// var curPath = path.join('/Users/mike', 'notepad.exe');
// console.log('파일 패스 : %s', curPath);

var filename = 'C:/Users/mike/notepad.exe';
var dirname = path.dirname(filename);
var basename = path.basename(filename);
var extname = path.extname(filename);

console.log('%s , %s , %s ', dirname, basename, extname);
