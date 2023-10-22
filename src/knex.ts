import config from './config';

const {
  host, user, pwd, db,
} = config.db;

const connection = {
  client: 'mysql',
  connection: {
    host,
    port: 3306,
    user,
    password: pwd,
    database: db,
  },
};

export default connection;
