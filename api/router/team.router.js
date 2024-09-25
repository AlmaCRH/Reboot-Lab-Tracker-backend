const router = require("express").Router();

const {
  getAllTeams,
  getTeam,
  getUsersWithTeamsAndPullsByLab,
  getTeamAndLab,
  createTeam,
  createTeamAndUsers,
  addLabToTeam,
  updateTeam,
  deleteTeam,
} = require("../controllers/team.controller");

router.get("/", getAllTeams);
router.get("/members", getUsersWithTeamsAndPullsByLab);
router.get("/labs", getTeamAndLab);
router.get("/:id", getTeam);

router.post("/", createTeam);
router.post("/members", createTeamAndUsers);
router.post("/labs", addLabToTeam);
router.put("/:id", updateTeam);
router.delete("/:id", deleteTeam);

module.exports = router;
