import { Application } from 'express';
import mongoose from '../services/mongoose';
import auth from './auth';

mongoose.connect();

export default (app: Application) : Application => { 
    app.use('/api', auth);
   
    return app;
};
