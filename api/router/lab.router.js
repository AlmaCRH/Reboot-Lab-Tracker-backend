const router = require("express").Router();

const {
  getAllLabs,
  getLab,
  createLab,
  createLabsAndPulls,
  updateLab,
  deleteLab,
} = require("../controllers/lab.controller");

router.get("/", getAllLabs);
router.get("/:id", getLab);
router.post("/", createLab);
router.post("/pulls", createLabsAndPulls);
router.put("/:id", updateLab);
router.delete("/:id", deleteLab);

module.exports = router;
