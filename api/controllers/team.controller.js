const Team = require("../models/team.model");
const User = require("../models/user.model.js");

const getAllTeams = async (request, response) => {
  try {
    const teams = await Team.findAll();
    return response.status(200).json(teams);
  } catch (error) {
    return response.status(501).send(error);
  }
};

const getTeam = async (request, response) => {
  try {
    const teams = await Team.findByPk(id);
    return response.status(200).json(teams);
  } catch (error) {
    return response.status(501).send(error);
  }
};

const createTeam = async (request, response) => {
  try {
    const teams = await Team.create(request.body);
    return response.status(200).json(teams);
  } catch (error) {
    return response.status(501).send(error);
  }
};

const createTeamAndUsers = async (request, response) => {
  try {
    console.log(request.body.team);
    const membersArray = request.body.members.map((member) => {
      return { username: member, role: "member" };
    });
    const team = await Team.create({ teamName: request.body.team });

    const members = await User.bulkCreate(membersArray);

    await team.addUsers(members);
  } catch (error) {
    console.error(error);
  }
};

const updateTeam = async (request, response) => {
  try {
    const teams = Team.update(request.body, {
      where: {
        id: request.params.id,
      },
    });
    return response.status(200).json(teams);
  } catch (error) {
    return response.status(501).send(error);
  }
};

const deleteTeam = async (request, response) => {
  try {
    await Team.destroy({
      where: {
        id: request.params.id,
      },
    });
    return response
      .status(200)
      .send(`Team with id ${request.params.id} was deleted`);
  } catch (error) {
    return response.status(501).send(error);
  }
};

module.exports = {
  getAllTeams,
  getTeam,
  createTeam,
  createTeamAndUsers,
  updateTeam,
  deleteTeam,
};
