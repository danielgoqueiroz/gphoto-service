var fs = require('fs');
var gphoto2 = require('gphoto2');
var GPhoto = new gphoto2.GPhoto2();
var shell = require('shelljs');

GPhoto.setLogLevel(1);
GPhoto.on('log', function (level, domain, message) {
  console.log(domain, message);
});


shell.exec("pkill -f gphoto2")
shell.exec("gphoto2 --capture-tethered")