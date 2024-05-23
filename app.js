'use strict';

const express = require('express'); 
const http = require('http');

var settings = {
    port: 3000
};

const app = express(); 
var apiRouter = express.Router();
app.use('/bitespeed', apiRouter);

var server = http.createServer(app);

apiRouter.get('/identify', (req, res)=>{
    res.status(200); 
    res.send("Welcome to root URL of Server"); 
});

server.on('uncaughtException', (err, origin) => {
    if (err.name === 'SyntaxError') {
      console.log(`Syntax error: ${err.message}`);
    } else if (err instanceof TypeError) {
      console.log(`Type error: ${err.message}`);
    } else if (err.syscall === 'listen') {
      const address = server.address();
      const bind = typeof address === 'string' ? `pipe ${address}` : `port ${address.port}`;
      if (err.code === 'EADDRINUSE') {
        console.log(`Cannot start server. ${bind} is already in use.`);
      } else if (err.code === 'EPROTO' && err.errno === 'EPROTO_TLS_CERTIFICATE') {
        console.log(`SSL certificate error: ${err.message}`);
      } else {
        console.log(`Server error: ${err}`);
      }
    } else {
      console.log(`Unhandled error: ${err}`);
    }
});

server.listen(settings.port, function(){
    console.log('Server started at port ' + settings.port);
});