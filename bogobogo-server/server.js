const express = require('express');
const path = require('path');

const app = express();
const port = 9999;

// Serve static files from the "static" directory
app.use(express.static(path.join(__dirname, 'static')));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});