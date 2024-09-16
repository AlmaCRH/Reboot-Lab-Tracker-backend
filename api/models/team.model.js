const { connection } = require("../../db/");
const { DataTypes } = require("sequelize");

const Team = connection.define(
  "team",
  {
    teamName: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: false }
);

module.exports = Team;
