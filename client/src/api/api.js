const fetchData = async (url) => {
    try {
        const response = await fetch(url, { method: "GET" });
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
export const getTasks = () => fetchData(`/api/task/list`);