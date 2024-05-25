const fetchData = async (url, method = "GET", body = null) => {
    try {
        const options = { method };
        if (body) {
            options.headers = { 'Content-Type': 'application/json' };
            options.body = JSON.stringify(body);
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
export const createTask = (task) => fetchData(`/api/task/create`, "POST", task);
export const updateTask = (task) => fetchData(`/api/task/update/${task.id}`, "PUT", task);
export const deleteTask = (task) => fetchData(`/api/task/delete/${task.id}`, "DELETE");
