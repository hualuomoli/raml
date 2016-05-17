// 进程工具类
var express = require('express');
var childProcess = require('child_process');

var logger = require('../logger/logger');


// 执行脚本
function executeScript(filename, params) {
  childProcess.execFile(filename, params, function (error, stdout, stderr) {
    if (error) {
      logger.error(error);
    }
  });


}


var util = {};

util.executeScript = executeScript;


module.exports = util;