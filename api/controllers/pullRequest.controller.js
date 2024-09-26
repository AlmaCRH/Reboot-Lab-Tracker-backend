const { Op } = require("sequelize");
const PullRequest = require("../models/pullRequest.model");
const User = require("../models/user.model");
const Lab = require("../models/lab.model");

const getAllPullRequests = async (request, response) => {
  try {
    const pullRequests = await PullRequest.findAll();
    return response.status(200).json(pullRequests);
  } catch (error) {
    return response.status(501).send(error);
  }
};

const getPullRequest = async (request, response) => {
  try {
    const pullRequests = await PullRequest.findByPk(id);
    return response.status(200).json(pullRequests);
  } catch (error) {
    return response.status(501).send(error);
  }
};

const createPullRequest = async (request, response) => {
  try {
    const pullRequests = await PullRequest.create(request.body);
    return response.status(200).json(pullRequests);
  } catch (error) {
    return response.status(501).send(error);
  }
};

const createPullsWithUsersAndLab = async (req, res) => {
  try {
    const pullsData = req.body.pullsData;
    const lab = await Lab.findOne({
      where: {
        title: req.body.lab,
      },
    });
    for (let pullData of pullsData) {
      const user = await User.findOne({
        where: {
          username: pullData.githubUser,
        },
      });
      const pullExist = await PullRequest.findOne({
        where: { repo_url: pullData.repo_url },
      });

      if (!pullExist && user?.username === pullData?.githubUser) {
        const pull = await PullRequest.create(pullData);
        pull.setUser(user);
        pull.setLab(lab);
        pull.save;
      }
    }
    return res.status(200).send("All pulls created");
  } catch (error) {
    res.status(501).send(error);
  }
};

const updatePullRequest = async (request, response) => {
  try {
    const pullRequests = PullRequest.update(request.body, {
      where: {
        id: request.params.id,
      },
    });
    return response.status(200).json(pullRequests);
  } catch (error) {
    return response.status(501).send(error);
  }
};

const deletePullRequest = async (request, response) => {
  try {
    await PullRequest.destroy({
      where: {
        id: request.params.id,
      },
    });
    return response
      .status(200)
      .send(`Pull request with id ${request.params.id} was deleted`);
  } catch (error) {
    return response.status(501).send(error);
  }
};

module.exports = {
  getAllPullRequests,
  getPullRequest,
  createPullRequest,
  updatePullRequest,
  createPullsWithUsersAndLab,
  deletePullRequest,
};
