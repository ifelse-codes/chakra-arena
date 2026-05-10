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

app.get('/test', (req, res) => {
  console.log(JSON.stringify({
    time: new Date().toISOString(),
    endpoint: '/test',
    msg: 'Test endpoint accessed'
  }));
  res.json({
    message: 'This is a test endpoint',
    timestamp: new Date().toISOString(),
    dummyData: {
      id: 1,
      name: 'Test Item',
      value: Math.random()
    }
  });
});

app.get('/test-book', (req, res) => {
  console.log(JSON.stringify({
    time: new Date().toISOString(),
    endpoint: '/test-book',
    msg: 'Test book endpoint accessed'
  }));
  
  const titles = ['The Great Gatsby', 'To Kill a Mockingbird', '1984', 'Pride and Prejudice', 'The Catcher in the Rye', 'Harry Potter and the Sorcerer\'s Stone', 'The Lord of the Rings', 'The Hobbit', 'Fahrenheit 451', 'Brave New World'];
  const authors = ['F. Scott Fitzgerald', 'Harper Lee', 'George Orwell', 'Jane Austen', 'J.D. Salinger', 'J.K. Rowling', 'J.R.R. Tolkien', 'J.R.R. Tolkien', 'Ray Bradbury', 'Aldous Huxley'];
  const genres = ['Fiction', 'Classic', 'Dystopian', 'Romance', 'Fantasy', 'Science Fiction', 'Adventure'];
  
  const randomIndex = Math.floor(Math.random() * titles.length);
  const randomYear = Math.floor(Math.random() * (2023 - 1950 + 1)) + 1950;
  
  res.json({
    id: Math.floor(Math.random() * 1000) + 1,
    title: titles[randomIndex],
    author: authors[randomIndex],
    publishedYear: randomYear,
    genre: genres[Math.floor(Math.random() * genres.length)],
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(JSON.stringify({ time: new Date().toISOString(), msg: `Server started on port ${PORT}` }));
});
