/* eslint-disable no-undef */
import mongoose from 'mongoose';
import should from 'should';
import request from 'supertest';
import User from '../../api/models/user';
import { generateToken } from '../../api/utils/auth';
import server from '../../index';

describe('user controller', () => {
  var user;
  var token;
  before(async () => {
    return User.remove().then(() => {
      user = new User({
        name: 'Seba',
        lastName: 'Default',
        email: 'seba_teste@testes.br',
        password: '1234',
      });
      return user.save().then(() => {
        token = generateToken(user._id, 'user');
        user = new User({
          name: 'Is',
          lastName: 'Nack',
          email: 'infocar@testes.br',
          password: '1234',
        });
        return user.save();
      });
    });
  });
  after(() => {
    user.remove();
  });

  describe('POST user', () => {
    it('should create User', (done) => {
      request(server)
        .post('/v1/user')
        .send({
          name: 'Seba',
          lastName: 'Real',
          email: 'seba@real.com',
          password: '123456',
        })
        .set('Accept', 'application/json')
        .expect(201)
        .end((err, res) => {
          should.not.exists(err);
          should.exists(res.body.data);
          res.body.data.should.be.an.instanceOf(Object);
          done();
        });
    });
    it('should not create User with email already used', (done) => {
      request(server)
        .post('/v1/user')
        .send({
          name: 'Seba',
          lastName: 'Real',
          email: 'seba@real.com',
          password: '123456',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(409)
        .end((err, res) => {
          res.error.status.should.eql(409);
          const text = JSON.parse(res.error.text);
          text.error_code.should.eql('ENTITY_ALREADY_USED');
          done();
        });
    });
  });
  describe('Authenticate user', () => {
    before(async () => {
      const user = new User({
        email: 'felipe@infosistemas.com',
        password: '123456',
        name: 'Felipe',
        lastName: 'Sistemas',
      });
      await user.save();
    });


    it('should NOT login with invalid credentials', (done) => {
      request(server)
        .post('/v1/user/authenticate')
        .send({
          email: 'seba@real.com',
          password: '1234567',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end((err, res) => {
          res.error.status.should.eql(401);
          const text = JSON.parse(res.error.text);
          text.message.should.eql('Error: Access Denied.');
          text.error_code.should.eql('UNAUTHORIZED_ACCESS');
          done();
        });
    });

    it('should not generate token with invalid e-mail', (done) => {
      request(server)
        .post('/v1/user')
        .send({
          email: 'invalid@email',
          password: '123_pass',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .end((err, res) => {
          res.error.status.should.eql(400);
          const text = JSON.parse(res.error.text);
          text.message.should.eql('Validation errors');
          done();
        });
    });
  });
});

