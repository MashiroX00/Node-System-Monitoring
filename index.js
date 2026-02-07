import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import routers from './src/routes/routers.js';

//app
const app = express();
app.use(cors());

//routes
app.get('/', (req, res) => {
  res.json({status: 'online', message: 'API is running' });
});
app.use('/api', routers);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

