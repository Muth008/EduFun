const express = require("express")
const helmet = require('helmet')
const ModuleController = require("./controller/module.controller")
const TaskController = require("./controller/task.controller")
const TaskItemController = require("./controller/taskItem.controller")
const ReviewController = require("./controller/review.controller")
const ScoreboardController = require("./controller/scoreboard.controller")
const ModuleProgressController = require("./controller/moduleProgress.controller")
const AuthController = require("./controller/auth.controller")
const UnauthorizedError = require('express-jwt').UnauthorizedError;
const app = express()

require("dotenv").config()

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))
app.use(helmet())

app.use("/api/module", ModuleController)
app.use("/api/moduleProgress", ModuleProgressController)
app.use("/api/task", TaskController)
app.use("/api/taskItem", TaskItemController)
app.use("/api/review", ReviewController)
app.use("/api/scoreboard", ScoreboardController)
app.use("/api/auth", AuthController)

app.use((err, req, res, next) => {
    if (err instanceof UnauthorizedError) {
        return res.status(401).json(err);
    }
    res.status(500).send({ status: 500, message: 'An unexpected error occurred'});
});

app.listen(process.env.SERVER_PORT, () =>
    console.log(`App running on port ${process.env.SERVER_PORT}`)
)