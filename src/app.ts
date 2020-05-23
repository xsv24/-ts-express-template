import express from 'express';
import cors from 'cors';

import config from './config';

const PORT = config.PORT || 3001;
const app = express();

app.use(cors({ 
    origin: '*',
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With', 'x-api-key'] 
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Hello"
    })
});

app.listen(PORT, () => console.log(`Serving content on ${PORT}`));