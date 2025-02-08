import express from 'express';

const app = express();

// Basic middleware
app.use(express.json());

// Test route
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to TripGo' +
          ' API',
        timestamp: '2025-02-08 16:56:55',
        author: 'AnshKBhatia'
    });
});

// Start server
const port = process.env.PORT || 3000;
// Replace the existing console.log in app.js with this:
app.listen(port, () => {
    console.log(`
    Server Status: Online ✅
    ------------------------------------------------
    📅 Started: 2025-02-08 18:04:21 (UTC)
    👤 User: AnshKBhatia
    ------------------------------------------------
    🔗 URLs:
    LOCAL  → http://localhost:${port}
    PORTAL → http://localhost:${port}/portal
    ------------------------------------------------
    `);
});