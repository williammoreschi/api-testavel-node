import HttpStatus from 'http-status';
import UsersControllers from '../../../controllers/users';

describe('Controllers Users', () => {
  describe('Get All users:getAll()', () => {
    it('should return list of users', () => {
      const Users = {
        findAll: td.function(),
      };
      const expectResponse = [{
        id: 1,
        name: 'Teste',
        createdAt: '2016-05-23T15:36:44.692Z',
        updatedAt: '2016-05-23T15:36:44.692Z',
      }];

      td.when(Users.findAll({})).thenResolve(expectResponse);

      const usersControllers = new UsersControllers(Users);
      return usersControllers.getAll()
        .then(response => expect(response.data).to.be.eql(expectResponse));
    });
  });
  describe('Get a user: getById()', () => {
    it('should  return a user', () => {
      const Users = {
        findOne: td.function(),
      };

      const expectResponse = {
        id: 1,
        name: 'Test',
        createdAt: '2016-05-23T15:36:44.692Z',
        updatedAt: '2016-05-23T15:36:44.692Z',
      };

      td.when(Users.findOne({ where: { id: 1 } })).thenResolve(expectResponse);

      const usersControllers = new UsersControllers(Users);
      return usersControllers.getById({ id: 1 })
        .then(response => expect(response.data).to.be.eql(expectResponse));
    });
  });

  describe('Create a user: create()', () => {
    it('should  create a user', () => {
      const Users = {
        create: td.function(),
      };

      const requestBody = {
        name: 'newUser',
      };
      const expectResponse = {
        id: 1,
        name: 'New User',
        createdAt: '2016-05-23T15:36:44.692Z',
        updatedAt: '2016-05-23T15:36:44.692Z',
      };

      td.when(Users.create(requestBody)).thenResolve(expectResponse);

      const usersControllers = new UsersControllers(Users);
      return usersControllers.create(requestBody)
        .then((response) => {
          expect(response.statusCode).to.be.eql(201);
          expect(response.data).to.be.eql(expectResponse);
        });
    });
  });

  describe('Update a user: update()', () => {
    it('should  update an existing user', () => {
      const Users = {
        update: td.function(),
      };

      const requestBody = {
        id: 1,
        name: 'Update user',
      };
      const expectResponse = {
        id: 1,
        name: 'Update user',
        createdAt: '2016-05-23T15:36:44.692Z',
        updatedAt: '2016-05-23T15:36:44.692Z',
      };

      td.when(Users.update(requestBody, { where: { id: 1 } })).thenResolve(expectResponse);

      const usersControllers = new UsersControllers(Users);
      return usersControllers.update(requestBody, { id: 1 })
        .then(response => expect(response.data).to.be.eql(expectResponse));
    });
  });

  describe('Delete a user: delete()', () => {
    it('should  delete an existing user', () => {
      const Users = {
        destroy: td.function(),
      };

      td.when(Users.destroy({ where: { id: 1 } })).thenResolve();

      const usersControllers = new UsersControllers(Users);
      return usersControllers.delete({ id: 1 })
        .then(response => expect(response.statusCode).to.be.eql(HttpStatus.NO_CONTENT));
    });
  });
});
