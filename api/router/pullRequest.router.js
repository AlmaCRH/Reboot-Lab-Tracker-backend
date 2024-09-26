const router = require("express").Router();

const {
  getAllPullRequests,
  getPullRequest,
  createPullRequest,
  updatePullRequest,
  createPullsWithUsersAndLab,
  deletePullRequest,
} = require("../controllers/pullRequest.controller");

router.get("/", getAllPullRequests);
router.get("/:id", getPullRequest);

router.post("/", createPullRequest);
router.post("/users", createPullsWithUsersAndLab);

router.put("/:id", updatePullRequest);
router.delete("/:id", deletePullRequest);

module.exports = router;
