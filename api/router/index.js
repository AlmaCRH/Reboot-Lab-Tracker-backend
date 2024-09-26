const router = require("express").Router();

const labRouter = require("./lab.router");
const pullRequestRouter = require("./pullRequest.router");
const teamRouter = require("./team.router");
const userRouter = require("./user.router");

router.use("/labs", labRouter);
router.use("/pulls", pullRequestRouter);
router.use("/teams", teamRouter);
router.use("/users", userRouter);

module.exports = router;
