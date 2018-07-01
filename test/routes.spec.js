const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const config = require('../knexfile')[process.env.NODE_ENV = 'test'];
const knex = require('knex')(config)

chai.use(chaiHttp);

describe('CLIENT routes', () => {
  it('should receive a response of html when we hit the root end point', done => {
    chai.request(server)
      .get('/')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.html;
        done();
      });
  });

  it('should return a 404 for a route that does not exist', done => {
    chai.request(server)
      .get('/trashpanda')
      .end((error, response) => {
        response.should.have.status(404);
        done();
      });
  });
});

describe('API routes', () => {

  beforeEach(done => {
    knex.migrate.rollback()
      .then(() => {
        knex.migrate.latest()
          .then(() => {
            return knex.seed.run()
              .then(() => { done() });
          });
      });
  });

  afterEach(done => {
    knex.migrate.rollback()
      .then(() => { done() });
  });

  describe('GET /api/v1/projects', () => {
    it('should return an array of all projects', done => {
      chai.request(server)
        .get('/api/v1/projects')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(1);
          response.body[0].should.have.property('name');
          response.body[0].name.should.equal('Almost out');
          done();
        });
    });
  });

  describe('GET /api/v1/palettes', () => {});

  describe('POST /api/v1/projects', () => {});

  describe('POST /api/v1/palettes', () => {});

  describe('DELETE /api/v1/palettes', () => {});

});