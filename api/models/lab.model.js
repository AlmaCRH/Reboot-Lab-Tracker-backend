const { connection } = require("../../db/");
const { DataTypes } = require("sequelize");

const Lab = connection.define(
  "lab",
  {
    title: {
      type: DataTypes.STRING,
      unique: true
    },
  },
  { timestamps: true }
);

module.exports = Lab;
