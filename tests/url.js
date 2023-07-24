require('dotenv').config();
const request = require('supertest');
const app = require('../app');
const db = require("../models");
const redis  = require('../config/redis');

beforeAll (async () => {
    await db.sequelize.sync();
    await redis.connect();
});

describe('API Test Suite', () => {
    const body = { longUrl:'https://example.com/test/long/url' };
    let shortUrl;

    test('POST /api/shorten create short url from long url', async () => {
        const response = await request(app)
            .post('/api/shorten')
            .send(body);
            expect(response.statusCode).toBe(201);
            shortUrl = (response.body.shortUrl.replaceAll('/', "%2F").replaceAll('/', "%3A"));
    });

    test('GET /api/redirect/:shortUrl redirect to long Url by using short Url', async () => {
        const response = await request(app)
            .get(`/api/redirect/${shortUrl}`)
            expect(response.statusCode).toBe(302);
    });
});
