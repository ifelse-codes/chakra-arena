# Chakra Arena Test App

Simple Node.js Express app for testing Chakra deployment pipeline.

## Local Development

```bash
npm install
npm start
```

Visit http://localhost:3000

## Docker

```bash
docker build -t chakra-arena-test .
docker run -p 3000:3000 chakra-arena-test
```

## Endpoints

- `GET /` - Returns JSON greeting
- `GET /health` - Health check endpoint
# Test deployment trigger at Mon Apr 27 10:28:52 IST 2026
