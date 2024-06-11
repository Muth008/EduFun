const fetchData = async (url, method = "GET", body = null, token = null) => {
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
        if (token) {
            options.headers = { ...options.headers, 'Authorization': `Bearer ${token}` };
        }
        const response = await fetch(url, options);
        const data = await response.json();
        if (response.status >= 400) {
            return { state: "error", error: data, status: response.status};
        } else {
            return { state: "success", data, status: response.status};
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

export const getModuleProgress = (id) => fetchData(`/api/moduleProgress?id=${id}`, "GET");
export const makeModuleProgress = (data) => fetchData(`/api/moduleProgress`, "POST", data);

export const loginUser = (data) => fetchData(`/api/auth/login`, "POST", data);
export const logoutUser = () => fetchData(`/api/auth/logout`);
export const registerUser = (data) => fetchData(`/api/auth/register`, "POST", data);
export const getUser = (token) => fetchData(`/api/auth/user`, "GET", null, token);

export const getProtected = () => fetchData(`/api/auth/protected`);