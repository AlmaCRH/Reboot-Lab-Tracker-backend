const Lab = require("../models/lab.model.js");
const Pull_Request = require("../models/pull_request.model.js");
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

const getUsersWithTeamsAndPullsByLab = async (req, res) => {
  try {
    const { teamName, labName } = req.query;

    const team = await Team.findOne({
      where: {
        teamName: teamName,
      },
      includes: [
        {
          model: User,
          through: { attributes: [] },
        },
        {
          model: Pull_Request,
          includes: [
            {
              model: Lab,
              where: { title: labName },
            },
          ],
        },
      ],
    });
    res.status(200).send(team);
  } catch (error) {
    res.status(501).send(error);
  }
};

const getTeamAndLab = async (req, res) => {
  try {
    const teamAndLabs = await Team.findOne({
      where: {
        teamName: req.query.team,
      },
      include: {
        model: Lab,
        where: {
          title: req.query.title,
        },
      },
    });

    const pulls = await Pull_Request.findAll({
      where: {
        labId: teamAndLabs.labs[0].id,
      },
    });
    return res.status(200).json(pulls);
  } catch (error) {
    return res.status(501).send(error);
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
    const membersCreated = await Promise.all(
      req.body.members.map(async (member) => {
        const [user] = await User.findOrCreate({
          where: { username: member, role: "member" },
        });
        return user;
      })
    );

    const [team] = await Team.findOrCreate({
      where: { teamName: req.body.team },
    });

    await team.addUsers(membersCreated);

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

    const [lab, labWasCreated] = await Lab.findOrCreate({
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
  getUsersWithTeamsAndPullsByLab,
  getTeamAndLab,
  createTeam,
  createTeamAndUsers,
  addLabToTeam,
  updateTeam,
  deleteTeam,
};
