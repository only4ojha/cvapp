const express = require('express');
const server = require('http').createServer();
const app = express();
const port = 4000;
const io = require('socket.io')(server, { wsEngine: 'ws', origins:'*:*' });


// Set public folder as root
app.use(express.static('public'));

// Provide access to node_modules folder
app.use('/scripts', express.static(`${__dirname}/node_modules/`));

// Redirect all traffic to index.html
app.use((req, res) => res.sendFile(`${__dirname}/public/index.html`));

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.info('listening on %d', port);
});