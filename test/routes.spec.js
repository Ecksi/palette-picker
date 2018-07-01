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
              .then(() => done());
          });
      });
  });

  afterEach(done => {
    knex.migrate.rollback()
      .then(() => done());
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

  describe('GET /api/v1/palettes', () => {
    it('should return an array of all palettes', done => {
      chai.request(server)
        .get('/api/v1/palettes')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(2);
          response.body[0].should.have.property('name');
          response.body[0].name.should.equal('not winter');
          response.body[0].should.have.property('color1');
          response.body[0].color1.should.equal('#CFDEE7');
          response.body[0].should.have.property('color2');
          response.body[0].color2.should.equal('#92B4F4');
          response.body[0].should.have.property('color3');
          response.body[0].color3.should.equal('#5E7CE2');
          response.body[0].should.have.property('color4');
          response.body[0].color4.should.equal('#4472CA');
          response.body[0].should.have.property('color5');
          response.body[0].color5.should.equal('#0A369D');
          done();
        });
    });
  });

  describe('POST /api/v1/projects', () => {
    it('should post a new project to the database', done => {
      chai.request(server)
        .post('/api/v1/projects')
        .send({
          projects: { name: 'dr. kalamazoos wild ride'}
        })
        .end((error, response) => {
          response.should.have.status(201);
          response.body.should.be.a('object');
          response.body.should.have.property('id');
          response.body.id.should.equal(2);
          done();
        });
    });

    it('should not post a new project if no title is provided', done => {
      chai.request(server)
        .post('/api/v1/projects')
        .send({projects:{}})
        .end((error, response) => {
          response.should.have.status(422);
          response.body.error.should.equal('Expected format: { name: <String> }. "name" property missing.');
          done();
        });
    });
  });

  describe('POST /api/v1/palettes', () => {
    it('should post a new palette to the database', done => {
      chai.request(server)
        .post('/api/v1/palettes')
        .send({
          palette: {
            name: "i am test palette",
            color1: "#FFFFFF",
            color2: "#000000",
            color3: "#BADA55",
            color4: "#B0BB0B",
            color5: "#123456",
            project_id: 1,
          }
        })
        .end((error, response) => {
          response.should.have.status(201);
          response.body.should.be.a('object');
          response.body.should.have.property('id');
          response.body.id.should.equal(3);
          done();
        });
    });
  });

  describe('DELETE /api/v1/palettes', () => {});

});