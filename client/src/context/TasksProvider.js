import { useEffect, useState } from "react";
import { TasksContext } from "./TasksContext";
import { createTask, deleteTask, getTasks, updateTask, getTasksItems, createTaskItem, updateTaskItem, deleteTaskItem } from "../api/api";

function TasksProvider({ children }) {
    const [taskLoadCall, setTaskLoadCall] = useState({ state: "pending" });
    const [taskItemLoadCall, setTaskItemLoadCall] = useState({ state: "pending" });
    const [originalTaskList, setOriginalTaskList] = useState([]);

    useEffect(() => {
        handleLoad();
    }, []);

    async function handleLoad() {
        const tasks = await getTasks();
        setTaskLoadCall(tasks);
        setOriginalTaskList(tasks.data);
        getTasksItems().then(setTaskItemLoadCall);
    }

    const handleFilterChange = (filterCriteria) => {
        const filtereTaskList = originalTaskList.filter(task => {
            for (let key in filterCriteria) {
                if (filterCriteria[key] && task[key]) {
                    if (!task[key].toString().toLowerCase().includes(filterCriteria[key].toString().toLowerCase())) {
                        return false;
                    }
                }
            }
            return true;
        });

        setTaskLoadCall({ ...taskLoadCall, data: filtereTaskList });
    };

    async function handleOperation(operation, task, taskItems) {
        const res = await operation(task);
        if (res.state !== "success") return res;
    
        if (taskItems?.length > 0) {
            const promises = taskItems.map(taskItem => {
                taskItem.taskId = res.data.id;
                return taskItem.id ? updateTaskItem(taskItem) : createTaskItem(taskItem);
            });
    
            const results = await Promise.all(promises);
            results.forEach((result, index) => {
                if (result.state !== "success") {
                    res.state = result.state;
                    console.error(`Failed to perform operation on task item: ${taskItems[index].name}`);
                } else {
                    taskItems[index] = result.data; // update task item with new id (for delete operation)
                }
            });
        }

        // Delete task items that are no longer in taskItems but are still in taskItemsList
        const taskItemsList = await getTasksItems();
        const taskItemsToDelete = taskItemsList.data.filter(
            (item) => item.taskId === task.id && !taskItems.some((newItem) => newItem.id === item.id)
        );
        await Promise.all(taskItemsToDelete.map(taskItem => deleteTaskItem({ id: taskItem.id })));
    
        handleLoad();
    
        return res;
    }

    const value = {
        state: taskLoadCall.state,
        taskList: taskLoadCall.data || [],
        taskItemsList: taskItemLoadCall.data || [],
        handlerMap: { 
            handleLoad, 
            handleUpdate: (task, taskItems) => handleOperation(updateTask, task, taskItems),
            handleCreate: (task, taskItems) => handleOperation(createTask, task, taskItems),
            handleDelete: (task, taskItems) => handleOperation(deleteTask, task, taskItems),
            handleFilterChange
        },
    };

    return (
        <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
    );
}


export default TasksProvider;
