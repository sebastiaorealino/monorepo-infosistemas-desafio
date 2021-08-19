import server from '../../index';
import User from '../../api/models/user';
import chai, { expect } from 'chai';

chai.use(require('chai-as-promised'));

// Write tests for model here
var user;
const genUser = () => {
  user = new User({
    name: 'sebastiao',
    lastName: 'realino',
    email: 'seba@seba.br',
    password: '1234',
  });
};

describe('User model', () => {
  before(() => {
    return User.remove();
  });

  beforeEach(() => {
    genUser();
  });

  afterEach(() => {
    User.remove();
  });

  it('should begin with no users', () => {
    return expect(User.find({}).exec()).to
      .eventually.have.length(0);
  });

  it('should not save when saving a duplicate user e-mail', () => {
    return expect(user.save()
      .then(() => {
        const userDup = new User({
          name: 'sebastiao',
          lastName: 'realino',
          email: 'seba@seba.br',
          password: '1234',
        });
        return userDup.save();
      })).to.be.rejected;
  });

  describe('#name', () => {
    it('should reject when saving with a blank email', () => {
      user.email = '';
      return expect(user.save()).to.be.rejected;
    });

    it('should fail when saving with a null email', function () {
      user.email = null;
      return expect(user.save()).to.be.rejected;
    });

    it('should fail when saving without a email', function () {
      user.email = undefined;
      return expect(user.save()).to.be.rejected;
    });

  });
});
