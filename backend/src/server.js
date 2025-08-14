const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const app = require('./app');

// Load environment variables
dotenv.config();

// Start server
const startServer = async () => {
  try {
    // Connect to database
    await connectDB();
    
    // Start server
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
      console.log(` Health check: http://localhost:${PORT}/api/health`);
      console.log(` Questions API: http://localhost:${PORT}/api/questions`);
      console.log(` Test API: http://localhost:${PORT}/api/test`);
    });
  } catch (error) {
    console.error(' Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();