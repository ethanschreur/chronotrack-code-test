import * as mysql from 'mysql2/promise'

export function getMysqlConnection() {
  return mysql.createConnection({
    database: process.env.MYSQL_DB,
    host: process.env.MYSQL_HOST,
    namedPlaceholders: true,
    password: process.env.MYSQL_PASS,
    port: +process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
  })
}