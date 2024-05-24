import { useEffect, useState } from "react";
import { ModulesContext } from "./ModulesContext";
import { getModules } from "../api/api";

function ModulesProvider({ children }) {
    const [moduleLoadCall, setModuleLoadCall] = useState({ state: "pending" });

    useEffect(() => {
        handleLoad();
    }, []);

    async function handleLoad() {
        getModules().then(setModuleLoadCall);
    }

    const value = {
        state: moduleLoadCall.state,
        moduleList: moduleLoadCall.data || [],
        handlerMap: { handleLoad },
    };

    return (
        <ModulesContext.Provider value={value}>
            {children}
        </ModulesContext.Provider>
    );
}

export default ModulesProvider;
