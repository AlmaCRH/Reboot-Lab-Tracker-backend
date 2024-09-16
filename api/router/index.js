const router = require("express").Router();

const labRouter = require("./lab.router");
const pull_requestRouter = require("./pull_request.router");
const teamRouter = require("./team.router");
const userRouter = require("./user.router");

router.use("/labs", labRouter);
router.use("/pulls", pull_requestRouter);
router.use("/teams", teamRouter);
router.use("/users", userRouter);

module.exports = router;
