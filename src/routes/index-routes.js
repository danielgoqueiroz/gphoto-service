const express = require('express');
const router = express.Router();

var gphoto2 = require('gphoto2');
var GPhoto = new gphoto2.GPhoto2();
var exec = require('child_process').exec;

var shell = require('shelljs');
var fs = require('fs');

router.get('/', async (req, res, next) => {
  let conectedCamera = false
  await exec("gphoto2 --auto-detect",
    function (error, stdout, stderr) {
      if (error !== null) {
        console.log(stdout)
        res.status(500).send(stout)
      }
      conectedCamera = stdout.includes("usb:")

      if (conectedCamera) {
        try {
          GPhoto.list(function (list) {
            if (list.length === 0) return;
            var camera = list[0];
            console.log(camera)
            if (camera != null) {
              res.status(200).send({
                camera: camera,
              });
              shell.exec("pkill -f gphoto2")
              shell.exec("gphoto2 --capture-tethered")
            } else {
              res.status(200).send({
                msg: "Camera desconectada",
              });
            }
          })
        } catch (err) {
          res.status(200).send({
            msg: "sem dados",
            erro: err
          });
        }
      } else {
        return res.status(401).send("Câmera desconectada")
      }
  });
  
});

router.get('/imagens', (req, res, next) => {
  var files = fs.readdirSync('../../../tmp');
  res.status(200).send(files)
})


module.exports = router;