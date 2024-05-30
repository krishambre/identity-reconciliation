'use strict';

const express = require('express'); 
const http = require('http');

const db = require('./config/database');

db.authenticate()
  .then(() => console.log('Database connected.....'))
  .catch(err => console.log('Error' + err));

var settings = {
    port: 3000
};

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/identify', require('./routes/identify'));

var server = http.createServer(app);

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
    //console.log(app)
});