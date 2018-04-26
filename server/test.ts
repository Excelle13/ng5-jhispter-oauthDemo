let express = require('express');
let app = express();
app.get('/', function (req, res) {
  res.send('<h1>你好，这是我们的第一个nodejs项目</h1>');
});
app.listen(8080);
