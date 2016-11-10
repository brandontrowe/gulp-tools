'use strict';

const gulp = require('gulp');
const fs = require('fs');

const config = {
    filePath: 'C:/',
    fileName: 'affiliate.csv',
    destPath: 'C:/affiliate/'
}

// expects a csv file with top header row
const loadFile = (cb) => {
    fs.readFile(config.filePath + config.fileName, 'utf8', function(err, data) {
        if (!err) {
            let data_arr = data.split(/\r\n/g)
            cb( data_arr );
        } else {
            throw err; // something went wrong. throw things
        }
    });
}

const convertToObj = (arr, cb) => {
    let obj_arr = [];
    let headers = arr[0].split(',');
    for(let i = 1; i < arr.length; i++) {
      let data = arr[i].split(',');
      let obj = {};
      for(let j = 0; j < data.length; j++) {
         obj[headers[j].trim()] = data[j].trim();
      }
      obj_arr.push(obj);
    }
    cb(obj_arr);
}

const compare = (a,b) => {
  if (a.source < b.source)
    return -1;
  if (a.source > b.source)
    return 1;
  return 0;
}

const convertToYml = (obj_arr, cb) => {
    let nl = '\r\n';
    let yml = '';
    let source = '';

    yml += '---' + nl;
    yml += 'Affiliates: ' + nl;

    for(let i = 0; i < obj_arr.length; i++) {
        if(obj_arr[i].source != source) {
            yml += '  ' + obj_arr[i].source + ': ' + nl;
            source = obj_arr[i].source;
        }
        yml += '    - id: ' + obj_arr[i].id + nl;
        yml += '      name: ' + obj_arr[i].name + nl;
        yml += '      url: ' + obj_arr[i].url + nl;
    }

    cb(yml);
}

const saveYml = (yml) => {
    let fileArr = config.fileName.split('.');
    let fileName = fileArr[0] + '.' + 'yml';
    fs.writeFile(config.destPath + fileName, yml, 'utf8', function(){
        console.log('File written: ' + config.destPath + fileName);
    })
}

gulp.task('default', function () {
    loadFile(function(arr) {
        convertToObj(arr, function(obj_arr){
            obj_arr.sort(compare)
            convertToYml(obj_arr, function(yml) {
                saveYml(yml);
            })
        });
    })
});
