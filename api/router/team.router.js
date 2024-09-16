const router = require("express").Router();

const {
  getAllTeams,
  getTeam,
  getTeamAndUsers,
  createTeam,
  createTeamAndUsers,
  updateTeam,
  deleteTeam,
} = require("../controllers/team.controller");

router.get("/", getAllTeams);
router.get("/members", getTeamAndUsers);

router.get("/:id", getTeam);

router.post("/", createTeam);
router.post("/members", createTeamAndUsers);
router.put("/:id", updateTeam);
router.delete("/:id", deleteTeam);

module.exports = router;
