module.exports = {
  development: {
    "username": process.env.MYSQL_USER || "admin",
    "password": process.env.MYSQLPASSWORD || "password@1234",
    "database": process.env.MYSQLDATABASE || "carDB",
    "host": process.env.MYSQLHOST || "127.0.0.1",
    "dialect": process.env.DB_DIALECT || "mysql",
    "logging": process.env.DB_LOGGING ? console.log : false
  },
  test: {
    "username": process.env.MYSQL_USER || "root",
    "password": process.env.MYSQLPASSWORD,
    "database": process.env.MYSQLDATABASE || "database_test",
    "host": process.env.MYSQLHOST || "127.0.0.1",
    "dialect": process.env.DB_DIALECT || "mysql"
  },
  production: {
    "username": process.env.MYSQL_USER || "root",
    "password": process.env.MYSQLPASSWORD,
    "database": process.env.MYSQLDATABASE || "database_production",
    "host": process.env.MYSQLHOST || "127.0.0.1",
    "dialect": process.env.DB_DIALECT || "mysql"
  }
}
