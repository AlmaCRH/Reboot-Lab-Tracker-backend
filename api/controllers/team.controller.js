const Lab = require("../models/lab.model.js");
const Team = require("../models/team.model");
const User = require("../models/user.model.js");

const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.findAll();
    return res.status(200).json(teams);
  } catch (error) {
    return res.status(501).send(error);
  }
};

const getTeam = async (req, res) => {
  try {
    const teams = await Team.findByPk(id);
    return res.status(200).json(teams);
  } catch (error) {
    return res.status(501).send(error);
  }
};

const getTeamAndUsers = async (req, res) => {
  try {
    const teamAndMembers = await Team.findOne({
      where: {
        teamName: req.query.team,
      },
      include: User,
    });
    return res.status(200).json(teamAndMembers);
  } catch (error) {
    return response.status(501).send(error);
  }
};

const createTeam = async (req, res) => {
  try {
    const teams = await Team.create(req.body);
    return res.status(200).json(teams);
  } catch (error) {
    return res.status(501).send(error);
  }
};

const createTeamAndUsers = async (req, res) => {
  try {
    const membersArray = req.body.members.map((member) => {
      return { username: member, role: "member" };
    });
    const team = await Team.create({ teamName: req.body.team });

    const members = await User.bulkCreate(membersArray);

    await team.addUsers(members);

    return res.status(200).send("Members added to team");
  } catch (error) {
    return res.status(501).send(error);
  }
};

const addLabToTeam = async (req, res) => {
  try {
    const team = await Team.findOne({
      where: {
        teamName: req.body.teamName,
      },
    });

    const lab = await Lab.findOne({
      where: {
        title: req.body.labName,
      },
    });

    team.addLab(lab);
    res.status(200).send("Lab added to team!");
  } catch (error) {
    return res.status(501).send(error);
  }
};

const updateTeam = async (req, res) => {
  try {
    const teams = Team.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    return res.status(200).json(teams);
  } catch (error) {
    return res.status(501).send(error);
  }
};

const deleteTeam = async (req, res) => {
  try {
    await Team.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.status(200).send(`Team with id ${req.params.id} was deleted`);
  } catch (error) {
    return res.status(501).send(error);
  }
};

module.exports = {
  getAllTeams,
  getTeam,
  getTeamAndUsers,
  createTeam,
  createTeamAndUsers,
  addLabToTeam,
  updateTeam,
  deleteTeam,
};
