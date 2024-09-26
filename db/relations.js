const Lab = require("../api/models/lab.model");
const User = require("../api/models/user.model");
const Team = require("../api/models/team.model");
const PullRequest = require("../api/models/pullRequest.model");

const addRelationsToModels = () => {
  try {
    User.hasMany(PullRequest);
    PullRequest.belongsTo(User);

    Lab.hasMany(PullRequest, {
      foreignKey: "labId",
    });
    PullRequest.belongsTo(Lab, {
      foreignKey: "labId",
    });

    User.belongsToMany(Team, {
      through: "teams_users",
      timestamps: false,
    });
    Team.belongsToMany(User, {
      through: "teams_users",
      timestamps: false,
    });

    Team.belongsToMany(Lab, {
      through: "teams_labs",
      timestamps: false,
    });
    Lab.belongsToMany(Team, {
      through: "teams_labs",
      timestamps: false,
    });

    console.log("Relations added to all models");
  } catch (error) {
    console.error(error);
  }
};

module.exports = addRelationsToModels;
