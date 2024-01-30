// config/index.js
module.exports = {
    development: {
      database: 'EmployeeDB',
      username: 'gauri',
      password: '12345',
      host: 'localhost',
      port: 5432,
      dialect: 'postgres',
    },
    // You can add configurations for other environments (e.g., production, testing) as needed
    // production: { ... },
    // testing: { ... },
  };