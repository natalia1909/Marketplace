import express from 'express';
import cors from 'cors';
const app = express();
import router from './routes/products.mjs';

app.use(cors());
app.use(express.json());

// router
app.use('/api/products', router);

// get for home page
app.get('/', (req, res) => {
    res.json({message: "Welcome to DressStore application."});
});

// listen
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});