const { Dogs, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Dogs', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Dogs.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Dogs.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Dogs.create({ name: 'Pug' });
      });
    });
  });
});
