import { useEffect, useState } from "react";
import { ModulesContext } from "./ModulesContext";
import { getModules, updateModule, createModule, deleteModule, getModuleProgress, makeModuleProgress } from "../api/api";

function ModulesProvider({ children }) {
    const [moduleLoadCall, setModuleLoadCall] = useState({ state: "pending" });
    const [originalModuleList, setOriginalModuleList] = useState([]); // Used for filtering

    useEffect(() => {
        handleLoad();
    }, []);

    async function handleLoad() {
        const modules = await getModules();
        setModuleLoadCall(modules);
        setOriginalModuleList(modules.data);
    }

    async function handleOperation(operation, module) {
        const res = await operation(module);
        if (res.state === "success") {
            handleLoad();
        }
        return res;
    }

    // Filter modules based on filterCriteria
    const handleFilterChange = (filterCriteria) => {
        const filteredModuleList = originalModuleList.filter(module => {
            for (let key in filterCriteria) {
                if (filterCriteria[key] && module[key]) {
                    if (!module[key].toString().toLowerCase().includes(filterCriteria[key].toString().toLowerCase())) {
                        return false;
                    }
                }
            }
            return true;
        });

        setModuleLoadCall({ ...moduleLoadCall, data: filteredModuleList });
    };

    const value = {
        state: moduleLoadCall.state,
        moduleList: moduleLoadCall.data || [],
        handlerMap: { 
            handleLoad, 
            handleUpdate: (module) => handleOperation(updateModule, module),
            handleCreate: (module) => handleOperation(createModule, module),
            handleDelete: (module) => handleOperation(deleteModule, module),
            handleGetProgress: (id) => handleOperation(getModuleProgress, id),
            handleMakeProgress: (data) => handleOperation(makeModuleProgress, data),
            handleFilterChange,
        },
    };

    return (
        <ModulesContext.Provider value={value}>
            {children}
        </ModulesContext.Provider>
    );
}

export default ModulesProvider;
