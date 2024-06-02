import React, { useContext } from "react";
import TaskCard from "./TaskCard";
import "../../assets/css/layout/Layout.css";
import "../../assets/css/task/TaskList.css";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";
import { TasksContext } from "../../context/TasksContext";

function TaskList() {

    const { taskList, state: taskState } = useContext(TasksContext);

    switch (taskState) {
        case "pending":
            return (
                <div className="loading">
                    <Icon size={2} path={mdiLoading} spin={true} />
                </div>
            );
        case "success":
            function getTaskList(taskList) {
                return taskList?.map((task) => {
                    return <TaskCard key={task.id} task={task} />;
                });
            }
            return (
                <div className="task-list">
                    {getTaskList(taskList)}
                </div>
            );
        case "error":
            return (
                <div className="error">
                    <p>Nepodařilo se načíst data</p>
                </div>
            );
        default:
            return null;
    }
}

export default TaskList;
