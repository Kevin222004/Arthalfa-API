const {Sequelize} = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false,
});

async function initializeDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);  // Exit the process if database connection fails
    }
}

async function closeDatabaseConnection() {
    try {
        await sequelize.close();
        console.log('Database connection closed successfully.');
    } catch (error) {
        console.error('Error closing database connection:', error);
    }
}

module.exports = {sequelize, initializeDatabase, closeDatabaseConnection};