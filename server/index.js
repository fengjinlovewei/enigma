const express = require('express');
const open = require('open');
const path = require('path');
const fs = require('fs');
const app = express();
const router = express.Router();
const cwd = process.cwd();
const velocity = require('velocityjs');
const port = 1991;
function engine(tpath, options, fn) {
  //console.log([tpath, options, fn]);
  const template = fs.readFileSync(tpath).toString();
  const macros = {
    parse(file) {
      return this.eval(fs.readFileSync(`${cwd}${file}`).toString());
    }
  };

  try {
    fn(
      null,
      velocity.render(template, options, macros, {
        escape: false
      })
    );
  } catch (err) {
    // eslint-disable-next-line
    console.log(err);
    fn(err);
  }
}

app.set('views', path.join(__dirname, '../www'));
app.set('view engine', 'html');
app.engine('html', engine);

router.get('/', function (req, res) {
  res.render('enigma/enigma', { path: '/enigma' });
});

app.use(express.static(path.resolve(__dirname, '../www')));
app.use(router);

app.listen(port, function () {
  open('http://enigmaco.de:' + port);
  console.log('监听3000端口');
});
