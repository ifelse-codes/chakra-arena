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

app.get('/test-flight', (req, res) => {
  console.log(JSON.stringify({
    time: new Date().toISOString(),
    endpoint: '/test-flight',
    msg: 'Test flight endpoint accessed'
  }));
  
  const airlines = ['Delta Air Lines', 'American Airlines', 'United Airlines', 'Southwest Airlines', 'JetBlue Airways', 'Alaska Airlines', 'Spirit Airlines', 'Frontier Airlines', 'Hawaiian Airlines', 'Allegiant Air'];
  const flightNumbers = ['DL123', 'AA456', 'UA789', 'WN012', 'JB345', 'AS678', 'NK901', 'F234', 'HA567', 'G890'];
  const origins = ['New York (JFK)', 'Los Angeles (LAX)', 'Chicago (ORD)', 'Atlanta (ATL)', 'Dallas (DFW)', 'Denver (DEN)', 'Seattle (SEA)', 'Miami (MIA)', 'Boston (BOS)', 'San Francisco (SFO)'];
  const destinations = ['London (LHR)', 'Paris (CDG)', 'Tokyo (NRT)', 'Dubai (DXB)', 'Singapore (SIN)', 'Sydney (SYD)', 'Toronto (YYZ)', 'Mexico City (MEX)', 'Frankfurt (FRA)', 'Amsterdam (AMS)'];
  const aircraftTypes = ['Boeing 737', 'Airbus A320', 'Boeing 777', 'Airbus A330', 'Boeing 787', 'Airbus A350', 'Boeing 747', 'Embraer E190', 'Bombardier CRJ900', 'ATR 72'];
  
  const randomIndex = Math.floor(Math.random() * airlines.length);
  const departureHour = Math.floor(Math.random() * 24);
  const departureMinute = Math.floor(Math.random() * 60);
  const arrivalHour = (departureHour + Math.floor(Math.random() * 12) + 1) % 24;
  const arrivalMinute = Math.floor(Math.random() * 60);
  
  res.json({
    flightId: Math.floor(Math.random() * 10000) + 1000,
    airline: airlines[randomIndex],
    flightNumber: flightNumbers[randomIndex],
    origin: origins[randomIndex],
    destination: destinations[randomIndex],
    departureTime: `${departureHour.toString().padStart(2, '0')}:${departureMinute.toString().padStart(2, '0')}`,
    arrivalTime: `${arrivalHour.toString().padStart(2, '0')}:${arrivalMinute.toString().padStart(2, '0')}`,
    aircraft: aircraftTypes[randomIndex],
    price: Math.floor(Math.random() * 1500) + 50,
    currency: 'USD',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(JSON.stringify({ time: new Date().toISOString(), msg: `Server started on port ${PORT}` }));
});
