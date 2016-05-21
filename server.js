var express = require('express');
var app = express();

app.get('/',function(req,res){
	res.sendfile('index.html');
});

app.use(express.static(__dirname + '/'));
app.use('/node_modules',express.static(__dirname + "/node_modules"));

var port = 3000;
app.listen(port);
console.log('server on ' + port);