import React, { useContext } from "react";
import TaskCard from "./TaskCard";
import styles from "../../assets/css/task/TaskList.module.css";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";
import { TasksContext } from "../../context/TasksContext";

function TaskList() {

    const { taskList, state: taskState } = useContext(TasksContext);

    switch (taskState) {
        case "pending":
            return (
                <div className={styles.loading}>
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
                <div className={styles["task-list"]}>
                    {getTaskList(taskList)}
                </div>
            );
        case "error":
            return (
                <div className={styles.error}>
                    <p>Nepodařilo se načíst data</p>
                </div>
            );
        default:
            return null;
    }
}

export default TaskList;
