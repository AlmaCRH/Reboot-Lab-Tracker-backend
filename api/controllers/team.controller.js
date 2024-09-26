const Lab = require("../models/lab.model.js");
const PullRequest = require("../models/pullRequest.model.js");
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
      include: [
        {
          model: User,
          through: {
            attributes: [],
          },
          include: [
            {
              model: PullRequest,
              include: [
                {
                  model: Lab,
                  where: { title: labName },
                },
              ],
            },
          ],
        },
      ],
    });
    if (team) {
      res.status(200).json(team);
    } else {
      res.status(404).send(undefined);
    }
  } catch (error) {
    res.status(500).send(error.message);
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

    const pulls = await PullRequest.findAll({
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
    let team = await Team.findOne({
      where: { teamName: req.body.team },
    });
    if (!team) team = await Team.create({ teamName: req.body.team });
    for (const memberData of req.body.members) {
      let member = await User.findOne({
        where: { username: memberData, role: "member" },
      });

      if (!member) {
        member = await User.create({
          username: memberData,
          role: "member",
        });
      }
      await team.addUsers(member);
    }
    return res.status(200).send("Team created");
  } catch (error) {
    return res.status(501).send(error);
  }
};

const addLabToTeam = async (req, res) => {
  try {
    let team = await Team.findOne({
      where: {
        teamName: req.body.teamName,
      },
    });

    if (!team) team = await Team.create({ teamName: req.body.teamName });

    let lab = await Lab.findOne({
      where: { title: req.body.labName },
    });
    if (!lab) lab = await Lab.create({ title: req.body.labName });

    if (team && lab) {
      await team.addLab(lab);
      return res.status(200).send("Lab added to team");
    }
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
