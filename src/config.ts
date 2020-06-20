export default {
    PORT: process.env.PORT ?? 3001,
    SECRET: process.env.SECRET ?? '',
    MONGODB_URI: process.env.MONGODB_URI ?? 'mongodb://localhost:auth'
};
