const Lab = require("../models/lab.model");
const Pull_Request = require("../models/pull_request.model");
const User = require("../models/user.model");

const getAllLabs = async (req, res) => {
  try {
    const labs = await Lab.findAll();
    return res.status(200).json(labs);
  } catch (error) {
    return res.status(501).send(error);
  }
};

const getLab = async (req, res) => {
  try {
    const labs = await Lab.findByPk(id);
    return res.status(200).json(labs);
  } catch (error) {
    return res.status(501).send(error);
  }
};

const getLabAndPulls = async (req, res) => {
  try {
    const labAndPulls = Lab.findOne({
      where: {
        title: req.query.labName,
      },
      include: {
        model: Pull_Request,
        as: "pulls",
      },
    });
    return res.status(200).json(labAndPulls);
  } catch (error) {
    return res.status(501).send(error);
  }
};

const createLab = async (req, res) => {
  try {
    const labs = await Lab.create(req.body);
    return res.status(200).json(labs);
  } catch (error) {
    return res.status(501).send(error);
  }
};

const createLabsAndPulls = async (req, res) => {
  try {
    const lab = await Lab.create({ title: req.body.lab });

    const pulls = await Pull_Request.bulkCreate(req.body.pulls);
    lab.addPulls(pulls);

    for (let i = 0; i < pulls.length; i++) {
      const user = User.findByPk(req.body.members[i].id);

      if (user.username === pulls[i].user) {
        pulls[i].userId = user.id;
        await pulls[i].save();
      }
    }
    pulls.addUser();
    return res.status(200).send("Pulls added to lab!");
  } catch (error) {
    return res.status(501).send(error);
  }
};

const updateLab = async (req, res) => {
  try {
    const labs = Lab.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    return res.status(200).json(labs);
  } catch (error) {
    return res.status(501).send(error);
  }
};

const deleteLab = async (req, res) => {
  try {
    await Lab.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.status(200).send(`Lab with id ${req.params.id} was deleted`);
  } catch (error) {
    return res.status(501).send(error);
  }
};

module.exports = {
  getAllLabs,
  getLab,
  getLabAndPulls,
  createLab,
  createLabsAndPulls,
  updateLab,
  deleteLab,
};
