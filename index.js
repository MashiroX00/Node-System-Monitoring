import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import routers from './src/routes/routers.js';
import { getSystemUsage, initializeResources } from './src/modules/resources.js';

//app
const app = express();
app.use(cors());

// Auto-run matrix collection
const runMatrix = async () => {
  try {
    await getSystemUsage(false); // Run immediately (no delay parameter anymore)
    console.log(`Matrix data updated at ${new Date().toISOString()}`);
  } catch (error) {
    console.error('Error updating matrix:', error);
  } finally {
    // Schedule next run after 5 seconds (or whatever INTERVAL is set to)
    const interval = process.env.MATRIX_INTERVAL || 5000;
    setTimeout(runMatrix, interval);
  }
};

// Initialize and start
const startServer = async () => {
  try {
    await initializeResources();
    console.log('Resources initialized.');
    
    runMatrix();

    //routes
    app.get('/', (req, res) => {
      res.json({status: 'online', message: 'API is running' });
    });
    app.use('/api', routers);
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

startServer();

