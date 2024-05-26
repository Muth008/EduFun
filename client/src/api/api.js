const fetchData = async (url, method = "GET", body = null) => {
    try {
        const options = { method };
        if (body) {
            if (body instanceof FormData) {
                options.body = body;
            } else {
                options.headers = { 'Content-Type': 'application/json' };
                options.body = JSON.stringify(body);
            }
        }
        const response = await fetch(url, options);
        const data = await response.json();
        if (response.status >= 400) {
            return { state: "error", error: data };
        } else {
            return { state: "success", data };
        }
    } catch (error) {
        return { state: "error", error };
    }
};

export const getModules = () => fetchData(`/api/module/list`);
export const getModule = (id) => fetchData(`/api/module?id=${id}`);
export const createModule = (module) => fetchData(`/api/module`, "POST", module);
export const updateModule = (module) => fetchData(`/api/module`, "PUT", module);
export const deleteModule = (module) => fetchData(`/api/module`, "DELETE", module);

export const getTasks = () => fetchData(`/api/task/list`);
export const getTask = (id) => fetchData(`/api/task/${id}`);
export const createTask = (task) => fetchData(`/api/task`, "POST", task);
export const updateTask = (task) => fetchData(`/api/task`, "PUT", task);
export const deleteTask = (task) => fetchData(`/api/task`, "DELETE", task);

export const getTasksItems = () => fetchData(`/api/taskItem/list`);
export const getTaskItem = (id) => fetchData(`/api/taskItem/${id}`);
export const createTaskItem = (taskItem) => fetchData(`/api/taskItem`, "POST", taskItem);
export const updateTaskItem = (taskItem) => fetchData(`/api/taskItem`, "PUT", taskItem);
export const deleteTaskItem = (taskItem) => fetchData(`/api/taskItem`, "DELETE", taskItem);
