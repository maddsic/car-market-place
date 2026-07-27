module.exports = {
  development: {
    "username": process.env.MYSQLUSER || "admin",
    "password": process.env.MYSQLPASSWORD || "password@1234",
    "database": process.env.MYSQLDATABASE || "carDB",
    "host": process.env.MYSQLHOST || "127.0.0.1",
    "port": process.env.MYSQLPORT || 3306,
    "dialect": process.env.DB_DIALECT || "mysql",
    "logging": process.env.DB_LOGGING ? console.log : false
  },
  test: {
    "username": process.env.MYSQLUSER || "root",
    "password": process.env.MYSQLPASSWORD,
    "database": process.env.MYSQLDATABASE || "database_test",
    "host": process.env.MYSQLHOST || "127.0.0.1",
    "port": process.env.MYSQLPORT || 3306,
    "dialect": process.env.DB_DIALECT || "mysql"
  },
  production: {
    "username": process.env.MYSQLUSER || "root",
    "password": process.env.MYSQLPASSWORD,
    "database": process.env.MYSQLDATABASE || "railway",
    "host": process.env.MYSQLHOST,
    "port": process.env.MYSQLPORT || 3306,
    "dialect": process.env.DB_DIALECT || "mysql",
    "logging": false
  }
}
