const express = require('express');
const open = require('open');
const path = require('path');
const app = express();

app.use(express.static(path.resolve(__dirname, './www')));
var server = app.listen(3000, function () {
  open('http://enigmaco.de:3000/enigma/enigma.html');
  console.log("监听3000端口")
})