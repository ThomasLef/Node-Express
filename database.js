import mysql from 'mysql2'

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'rpayTransactions',
    password: '',
    socketPath: '/var/run/mysqld/mysqld.sock'
  });

export default connection