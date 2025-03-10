require("dotenv").config();
const { Sequelize } = require("sequelize");

const connection = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
    port: process.env.DATABASE_PORT,
    logging: false,
  }
);

const checkConnection = async () => {
  try {
    await connection.authenticate();
    console.log("Connected!");
  } catch (error) {
    console.error(error);
  }
};

const syncModels = async () => {
  try {
    await connection.sync({ force: true });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { connection, checkConnection, syncModels };
