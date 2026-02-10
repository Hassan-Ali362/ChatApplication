import express from 'express';
import dotenv from 'dotenv';
import authroutes from "./src/routes/auth.route.js";
import messageroutes from "./src/routes/message.route.js";
import connectDB from './src/lib/db.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());  // before going to routes json data will be parsed here that is sent from frontend so make avaialable in req.body
app.use(cookieParser());

app.use('/api/auth/', authroutes);
app.use('/api/messages/', messageroutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
