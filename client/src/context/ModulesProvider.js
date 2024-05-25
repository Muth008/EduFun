import { useEffect, useState } from "react";
import { ModulesContext } from "./ModulesContext";
import { getModules, updateModule, createModule, deleteModule } from "../api/api";

function ModulesProvider({ children }) {
    const [moduleLoadCall, setModuleLoadCall] = useState({ state: "pending" });

    useEffect(() => {
        handleLoad();
    }, []);

    async function handleLoad() {
        getModules().then(setModuleLoadCall);
    }

    async function handleOperation(operation, module) {
        const res = await operation(module);
        if (res.state === "success") {
            handleLoad();
        }
        return res;
    }

    const value = {
        state: moduleLoadCall.state,
        moduleList: moduleLoadCall.data || [],
        handlerMap: { 
            handleLoad, 
            handleUpdate: (module) => handleOperation(updateModule, module),
            handleCreate: (module) => handleOperation(createModule, module),
            handleDelete: (module) => handleOperation(deleteModule, module)
        },
    };

    return (
        <ModulesContext.Provider value={value}>
            {children}
        </ModulesContext.Provider>
    );
}

export default ModulesProvider;
