const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 9999;

// Serve static files from the "static" directory
app.use(express.static(path.join(__dirname, 'static')));

// HTTPS server
https.createServer({
  key: fs.readFileSync('./CA/2_bogobogo.cn.key'),
  cert: fs.readFileSync('./CA/1_bogobogo.cn_bundle.crt')
}, app).listen(port, () => {
  console.log(`Server is running at https://localhost:${port}`);
});