import knex from 'knex';
import knexConfig from '../knex';

const db = knex(knexConfig);

const getUsers = async () => {
  const users = await db('user').select('*');
  return users;
};

const getUsers2 = async () => {
  const users = await db('user').select('*');
  return users;
};

export {
  getUsers,
  getUsers2,
};
