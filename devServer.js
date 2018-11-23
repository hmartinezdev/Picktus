const { server, app } = require('./src/server/server.js');

const port = parseInt(process.env.PORT, 10) || 3000;

app.prepare().then(() => {
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
