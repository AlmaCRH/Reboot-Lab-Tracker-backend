const { Op } = require("sequelize");
const Pull_Request = require("../models/pull_request.model");
const User = require("../models/user.model");
const Lab = require("../models/lab.model");

const getAllPull_Requests = async (request, response) => {
  try {
    const pull_Requests = await Pull_Request.findAll();
    return response.status(200).json(pull_Requests);
  } catch (error) {
    return response.status(501).send(error);
  }
};

const getPull_Request = async (request, response) => {
  try {
    const pull_Requests = await Pull_Request.findByPk(id);
    return response.status(200).json(pull_Requests);
  } catch (error) {
    return response.status(501).send(error);
  }
};

const createPull_Request = async (request, response) => {
  try {
    const pull_Requests = await Pull_Request.create(request.body);
    return response.status(200).json(pull_Requests);
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

      if (user?.username === pullData?.githubUser) {
        const pull = await Pull_Request.create(pullData);
        pull.setUser(user);
        pull.setLab(lab);
        pull.save;
      }
    }
    return res.status(200).send("All pulls created");
  } catch (error) {
    console.log(error.message);
    res.status(501).send(error);
  }
};

const updatePull_Request = async (request, response) => {
  try {
    const pull_Requests = Pull_Request.update(request.body, {
      where: {
        id: request.params.id,
      },
    });
    return response.status(200).json(pull_Requests);
  } catch (error) {
    return response.status(501).send(error);
  }
};

const deletePull_Request = async (request, response) => {
  try {
    await Pull_Request.destroy({
      where: {
        id: request.params.id,
      },
    });
    return response
      .status(200)
      .send(`Pull_Request with id ${request.params.id} was deleted`);
  } catch (error) {
    return response.status(501).send(error);
  }
};

module.exports = {
  getAllPull_Requests,
  getPull_Request,
  createPull_Request,
  updatePull_Request,
  createPullsWithUsersAndLab,
  deletePull_Request,
};
