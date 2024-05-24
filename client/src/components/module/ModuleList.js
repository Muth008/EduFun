import React from "react";
import ModuleCard from "./ModuleCard";
import styles from "../../assets/css/module/ModuleList.module.css";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";
import { ModulesContext } from "../../context/ModulesContext";
import { useContext } from "react";

function ModuleList() {
    const { moduleList, state: moduleState } = useContext(ModulesContext);

    switch (moduleState) {
        case "pending":
            return (
                <div className={styles.loading}>
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
                <div className={styles["module-list"]}>
                    {getModuleList(moduleList)}
                </div>
            );
        case "error":
            return (
                <div className={styles.error}>
                    <p>Nepodařilo se načíst data</p>
                </div>
            );
        default:
            return null;
    }
}

export default ModuleList;
