var express = require('express');
var fs = require('fs');
var request = require("request");

var app = express();

app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/upload'));
app.get('/', function (req, res) {

    
    var uri = 'http://citizenschools.wpengine.netdna-cdn.com/california/files/2011/01/google-logo-small.gif';
    var splitURI = uri.split('/');
    var filename = splitURI[splitURI.length-1];
    var templateData = {remote:uri,local:'/'+filename};
    request(uri,function(err,req,body){
        console.log('body',body)
        fs.writeFile('./upload/'+filename,body)
        // var wstream = fs.createWriteStream('./upload/'+filename);
        // wstream.write(body);
        // wstream.end();

        res.render('templates/index.html.ejs',templateData);
    })
    // .pipe(fs.createWriteStream('./upload/'+filename))

})

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);

})