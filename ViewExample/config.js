var path = '../commonModule/user_dao2';

var user = require('./routes/user2');

module.exports = {
  server_port: 3000,
  db_url: 'mongodb://localhost:27017/shopping',
  db_schemas: [
    {
      //file: '../database/user_schema2',
      file: './database/user_schema',
      collection: 'shopping',
      schemaName: 'users',
      modelName: 'UserModel',
    },
  ],
  route_info: [
    {
      file: './user',
      path: '/process/login',
      method: 'login',
      type: 'post',
    },
    {
      file: './user',
      path: '/process/adduser',
      method: 'addUser',
      type: 'post',
    },
    {
      file: './user',
      path: '/process/listuser',
      method: 'userList',
      type: 'post',
    },
    { file: './test', path: '/process/test1', method: 'test1', type: 'post' },
    { file: './test', path: '/process/test1', method: 'test1', type: 'post' },
  ],
};
