const { Op } = require("sequelize");
const Pull_Request = require("../models/pull_request.model");
const User = require("../models/user.model");

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

const getPullsByUsers = async (req, res) => {
  try {
    const pull_Requests = await Pull_Request.findAll({
      where: {
        userId: req.query.userId,
      },
    });
    return res.status(200).json(pull_Requests);
  } catch (error) {
    return res.status(501).send(error);
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

const addUserToPulls = async (req, res) => {
  try {
    const { pulls } = req.body;
    const pullData = pulls.map((pull) => {
      return { username: pull.githubUser, url: pull.repo_url };
    });

    const urls = pullData.map((pull) => pull.url);
    const usernames = pullData.map((pull) => pull.username);

    const pullRequests = await Pull_Request.findAll({
      where: {
        repo_url: {
          [Op.in]: urls,
        },
      },
    });
    console.log(urls);

    const users = await User.findAll({
      where: {
        username: {
          [Op.in]: usernames,
        },
      },
    });
    await Promise.all(
      pullRequests.map(async (pull, index) => {
        if (users) {
          console.log(users[index].id);
          pull.userId = users[index].id;
          await pull.save();
        }
      })
    );

    res.status(200).send("Users added to their corresponded pull!");
  } catch (error) {
    console.log(error);
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
  getPullsByUsers,
  createPull_Request,
  updatePull_Request,
  addUserToPulls,
  deletePull_Request,
};
