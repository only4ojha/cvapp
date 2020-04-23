const fs = require('fs');
const key = fs.readFileSync('key.pem');
const cert = fs.readFileSync('cert.pem');
const express = require('express');
const https = require('https');
const app = express();
var path = require('path');
const server = https.createServer({key: key, cert: cert }, app);
const port = 3000;
const io = require('socket.io')(server, { wsEngine: 'ws', origins:'*:*' });

// Set public folder as root
app.use(express.static(path.join(__dirname, 'public')));

// Provide access to node_modules folder
app.use('/scripts', express.static(`${__dirname}/node_modules/`));

// Redirect all traffic to index.html
app.use((req, res) => res.sendFile(`${__dirname}/public/index.html`));

https.createServer({key: key, cert: cert }, app).listen(port);