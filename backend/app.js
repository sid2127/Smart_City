import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

// app.get('/', (req, res) => {
//     console.log("Root route hit ✅");
//     res.send('Server is running!');
// });

import user from './src/routes/user.routes.js'
import complaint from './src/routes/complaint.routes.js'

app.use("/api/v1/user" , user);
app.use("/api/v1/complaint" , complaint);

export { app };