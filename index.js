const express = require('express');
const {initializeDatabase, closeDatabaseConnection, sequelize} = require('./config/db');
const mainRouter = require('./routes/index');
const errorHandler = require('./middleware/errorhandler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/v1', mainRouter);
app.use(errorHandler);

async function startServer() {
    try {
        await initializeDatabase();
        await sequelize.sync();

        const server = app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });

        process.on('SIGINT', async () => {
            console.log('SIGINT signal received: closing HTTP server');
            server.close(async () => {
                console.log('HTTP server closed');
                await closeDatabaseConnection();
                process.exit(0);
            });
        });

        process.on('SIGTERM', async () => {
            console.log('SIGTERM signal received: closing HTTP server');
            server.close(async () => {
                console.log('HTTP server closed');
                await closeDatabaseConnection();
                process.exit(0);
            });
        });

    } catch (error) {
        console.error('Failed to start the server:', error);
        process.exit(1);
    }
}

startServer().then(() => console.log("server started"));