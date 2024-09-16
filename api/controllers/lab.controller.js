const Lab = require("../models/lab.model");
const Pull_Request = require("../models/pull_request.model");

const getAllLabs = async (request, response) => {
  try {
    const labs = await Lab.findAll();
    return response.status(200).json(labs);
  } catch (error) {
    return response.status(501).send(error);
  }
};

const getLab = async (request, response) => {
  try {
    const labs = await Lab.findByPk(id);
    return response.status(200).json(labs);
  } catch (error) {
    return response.status(501).send(error);
  }
};

const createLab = async (request, response) => {
  try {
    const labs = await Lab.create(request.body);
    return response.status(200).json(labs);
  } catch (error) {
    return response.status(501).send(error);
  }
};

const createLabsAndPulls = async (req, res) => {
  try {
    const lab = await Lab.create({ title: req.body.lab });

    const pulls = await Pull_Request.bulkCreate(req.body.pulls);
    lab.addPulls(pulls);
    return res.status(200).send("Pulls added to lab!");
  } catch (error) {
    console.error(error);
  }
};

const updateLab = async (request, response) => {
  try {
    const labs = Lab.update(request.body, {
      where: {
        id: request.params.id,
      },
    });
    return response.status(200).json(labs);
  } catch (error) {
    return response.status(501).send(error);
  }
};

const deleteLab = async (request, response) => {
  try {
    await Lab.destroy({
      where: {
        id: request.params.id,
      },
    });
    return response
      .status(200)
      .send(`Lab with id ${request.params.id} was deleted`);
  } catch (error) {
    return response.status(501).send(error);
  }
};

module.exports = {
  getAllLabs,
  getLab,
  createLab,
  createLabsAndPulls,
  updateLab,
  deleteLab,
};
