import supertest from 'supertest';
import app from './app';

const request = supertest(app);

describe('App endpoint test', () => {
    it('endpoint: "/"', async done => {
        const res = await request.get('/')
        expect(res.status).toBe(200);
        done();
    })
});