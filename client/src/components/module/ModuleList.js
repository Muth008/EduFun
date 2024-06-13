import React from "react";
import ModuleCard from "./ModuleCard";
import "../../assets/css/module/ModuleList.css";
import "../../assets/css/layout/Layout.css";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";
import { ModulesContext } from "../../context/ModulesContext";
import { useContext } from "react";

function ModuleList() {
    const { moduleList, state: moduleState } = useContext(ModulesContext);

    switch (moduleState) {
        case "pending":
            return (
                <div className="loading">
                    <Icon size={2} path={mdiLoading} spin={true} />
                </div>
            );
        case "success":
            function getModuleList(moduleList) {
                return moduleList?.map((module) => {
                    return (
                        <ModuleCard key={module.id} module={module} />
                    );
                });
            }
            return (
                <div className="module-list">
                    {getModuleList(moduleList)}
                </div>
            );
        case "error":
            return (
                <div className="error">
                    <p>Data could not be loaded</p>
                </div>
            );
        default:
            return null;
    }
}

export default ModuleList;
