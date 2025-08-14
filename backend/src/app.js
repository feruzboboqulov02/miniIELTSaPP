import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import questionRoutes from './routes/questionRoutes.js';
import testRoutes from './routes/testRoutes.js';

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
app.use('/:path', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({ 
    error: err.message || 'Internal server error' 
  });
});

export default app;