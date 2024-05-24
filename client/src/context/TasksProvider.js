import { useEffect, useState } from "react";
import { TasksContext } from "./TasksContext";
import { getTasks } from "../api/api";

function TasksProvider({ children }) {
    const [taskLoadCall, setTaskLoadCall] = useState({ state: "pending" });

    useEffect(() => {
        handleLoad();
    }, []);

    async function handleLoad() {
        getTasks().then(setTaskLoadCall);
    }

    const value = {
        state: taskLoadCall.state,
        taskList: taskLoadCall.data || [],
        handlerMap: { handleLoad },
    };

    return (
        <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
    );
}

export default TasksProvider;
