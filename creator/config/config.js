var minimist = require('minimist');

//
module.exports = {
  port: 3000,
  scriptSuffix: 'bat', // 后缀
  setConfig: function () {
    var options = minimist(process.argv.slice(2));
    if (options && !!options.port) {
      this.port = options.port;
    }
    if (options && !!options.scriptSuffix) {
      this.scriptSuffix = options.scriptSuffix;
    }
    return this;
  }
}