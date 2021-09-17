/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js')
const { Dogs, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  id:'670b9562-b30d-52d5-b827-655787665500',
  name: 'Emmeline',
  height: '30-40',
  weight: '15-20',
  year: '12-15',
  image: 'https://programmerclick.com/images/292/d6293e65eacc81f9d637a34419b6c374.JPEG'
};

describe('Dogs routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Dogs.sync({ force: true })
    .then(() => Dogs.create(dog)));
  describe('GET /dogs', () => {
    it('should get 200', () =>
      agent.get('/dogs').expect(200)
    );
  });
  describe('GET /temperament', () => {
    it('should get 200', () =>
      agent.get('/temperament').expect(200)
    );
  });
});
