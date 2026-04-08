import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    console.log("Root route hit ✅");
    res.send('Server is running!');
});

export { app };