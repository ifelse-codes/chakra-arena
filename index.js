const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// Structured JSON request logging middleware
app.use((req, res, next) => {
  const startTime = Date.now();
  res.on('finish', () => {
    const latency_ms = Date.now() - startTime;
    console.log(JSON.stringify({
      time: new Date().toISOString(),
      method: req.method,
      uri: req.originalUrl || req.url,
      status: res.statusCode,
      latency_ms,
      remote_ip: req.ip || (req.connection && req.connection.remoteAddress) || '',
      user_agent: req.get('user-agent') || '',
      host: req.get('host') || '',
      msg: `${req.method} ${req.originalUrl} ${res.statusCode} ${latency_ms}ms`
    }));
  });
  next();
});

app.get('/', (req, res) => {
  res.json({
    message: 'Hello from Chakra Arena Test App!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(JSON.stringify({ time: new Date().toISOString(), msg: `Server started on port ${PORT}` }));
});
