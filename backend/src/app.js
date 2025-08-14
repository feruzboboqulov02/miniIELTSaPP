const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const questionRoutes = require('./routes/questionRoutes');
const testRoutes = require('./routes/testRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'IELTS Mock Test API is running',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api/questions', questionRoutes); // Admin CRUD operations
app.use('/api/test', testRoutes);          // User test operations

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({ 
    error: err.message || 'Internal server error' 
  });
});

module.exports = app;