const expect = require('expect');
const request = require('supertest');

const {app} = require('../server');

beforeEach((done) => {
    // empty database before running tests
    done();
});

describe('POST /likes', () => {
    it('should add a new like', (done) => {
        var text = 'Mo & 30 added';

        request(app)
            .post('/likes')
            .send({userId: 'Mo', itemId: 30})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe();
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                done();
            });
    });
});