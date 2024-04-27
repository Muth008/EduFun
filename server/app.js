const express = require("express")
const helmet = require('helmet')
const ModuleController = require("./controller/module.controller")
const TaskController = require("./controller/task.controller")
const TaskItemController = require("./controller/taskItem.controller")
const ReviewController = require("./controller/review.controller")
const ScoreboardController = require("./controller/scoreboard.controller")
const ModuleProgressController = require("./controller/moduleProgress.controller")
const app = express()

require("dotenv").config()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet())

app.use("/api/module", ModuleController)
app.use("/api/moduleProgress", ModuleProgressController)
app.use("/api/task", TaskController)
app.use("/api/taskItem", TaskItemController)
app.use("/api/review", ReviewController)
app.use("/api/scoreboard", ScoreboardController)

app.listen(process.env.PORT, () =>
    console.log(`App running on port ${process.env.PORT}`)
)