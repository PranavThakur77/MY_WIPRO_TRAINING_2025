process.env.NODE_ENV = 'test';
const request = require('supertest');
const server = require('../server');
const should = require('chai').should();

describe('Users API', () => {

  it('should GET all users', async () => {
    const res = await request(server).get('/api/users');
    res.status.should.equal(200);
    res.body.should.be.a('array');
  });

  it('should POST a new user', async () => {
    const user = { name: 'Charlie' };
    const res = await request(server).post('/api/users').send(user);
    res.status.should.equal(201);
    res.body.should.have.property('name').eql('Charlie');
  });

});
