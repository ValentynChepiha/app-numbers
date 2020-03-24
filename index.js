const express = require('express');
const multer  = require('multer');
const calculateNumbers = require('./js/calculate.numbers');
const fs = require("fs");

const app = express();
const upload = multer({ dest: 'data/' });
const RESULT = {min: null, max:null, average:null, median: null, incnumbers:null, decnumbers: null, error: null};

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index', RESULT);
});

app.post('/',  upload.single('filedata'), async (req, res) => {
  let filename = '10m.txt';
  if(req.file && req.file.filename) {
    filename = req.file.filename;
  }
  const {result, error} = await calculateNumbers(filename);
  if(filename !== '10m.txt'){
    fs.unlinkSync(`data/${filename}`);
  }
  res.render('index', {...RESULT, ...result, error});
});

app.listen(3000, ()=>{
  console.log('server started');
});