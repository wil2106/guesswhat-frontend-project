var express = require("express");
var app = express();
const game = require('./game.js')

// serve a static file to the browser 
app.use(express.static('public'));

// Handle environment changes
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
 
var server = app.listen(port, ip_address, function(){
    console.log( 'Listening on ' + ip_address + ', server_port ' + port );
});

game.init(server);


