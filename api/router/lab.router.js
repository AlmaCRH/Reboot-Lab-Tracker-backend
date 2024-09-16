const router = require("express").Router();

const {
  getAllLabs,
  getLab,
  getLabAndPulls,
  createLab,
  createLabsAndPulls,
  updateLab,
  deleteLab,
} = require("../controllers/lab.controller");

router.get("/", getAllLabs);
router.get("/pulls", getLabAndPulls);
router.get("/:id", getLab);
router.post("/", createLab);
router.post("/pulls", createLabsAndPulls);
router.put("/:id", updateLab);
router.delete("/:id", deleteLab);

module.exports = router;
