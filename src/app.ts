import express from 'express';
import cors from 'cors';
import routes from './routes'; 
import config from './config';

const PORT = config.PORT || 3001;
const app = express();

app.use(cors({ 
    origin: '*',
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With', 'x-api-key'] 
}));

app.use(express.json());

routes(app);

app.listen(PORT, () => console.log(`Serving content on ${PORT}`));

export default app;
