const express = require('express');

const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  // 123
});

app.listen(3000, ()=>{
  console.log('server started');
});