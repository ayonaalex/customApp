const express = require('express');
const next = require('next');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: './nextjs' });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Serve static files from React's build directory
  server.use('/client', express.static(path.join(__dirname, 'client/build')));

  // Route to serve the React app as /second
  server.get('/second', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });

  // Handle all other routes with Next.js (including the root homepage '/')
  server.get('*', (req, res) => {
    return handle(req, res);
  });

  // Set the port
  const port = process.env.PORT || 3002;
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
