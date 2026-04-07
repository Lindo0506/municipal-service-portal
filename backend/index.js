const express = require('express');
const cors = require('cors');

const app = express();

const requests = require('./serviceRequests');

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('API is running 🚀');
});

//(POST ROUTE)
app.post('/service-requests', (req, res) => {
  const { category, description, lat, lng } = req.body;

  if (!category || !description) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const newRequest = {
    id: requests.length + 1,
    category,
    description,
    lat,
    lng,
    status: "Submitted",
    createdAt: new Date()
  };

  requests.push(newRequest);

  res.status(201).json(newRequest);
});

// ✅ GET ROUTE
app.get('/service-requests', (req, res) => {
  res.json(requests);
});

// Start server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});