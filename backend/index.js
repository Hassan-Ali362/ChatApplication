import express from 'express';
import dotenv from 'dotenv';
import authroutes from "./src/routes/auth.route.js";
import messageroutes from "./src/routes/message.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/auth/', authroutes);
app.use('/api/messages/', messageroutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
