import mongoose from 'mongoose';
import config from '../config';

mongoose.set('useCreateIndex', true);

export const connect = () => {
    mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(_ => console.log('Connected to Mongo'))
    .catch(err => console.log('Mongo Connection error: ', err));
};

export default {
    connect
};
