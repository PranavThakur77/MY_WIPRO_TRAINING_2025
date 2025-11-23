process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);  

describe('Courses API', () => {

  it('should GET all courses', (done) => {
    chai.request(server)
      .get('/api/courses')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
  });

  it('should GET a course by the given id', (done) => {
    chai.request(server)
      .get('/api/courses/1')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('name');
        done();
      });
  });

  it('should POST a new course', (done) => {
    const course = { name: 'Vue.js' };
    chai.request(server)
      .post('/api/courses')
      .send(course)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('name').eql('Vue.js');
        done();
      });
  });
});
