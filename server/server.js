const express = require('express');

const app = express();
const port = 3010;

app.use(express.static(__dirname + './../client/dist'));

app.listen(port,() => console.log('serving at port ' + port));