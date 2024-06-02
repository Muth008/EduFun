import React, { useContext, useState } from "react";
import "../../assets/css/headerPanel/HeaderPanel.css";
import Icon from "@mdi/react";
import { mdiFilterVariant, mdiPlusCircleOutline } from "@mdi/js";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { TasksContext } from "../../context/TasksContext";
import { ModulesContext } from "../../context/ModulesContext";
import FilterModal from "../filterModal/FilterModal";

function HeaderPanel(props) {
    const navigate = useNavigate();
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [filtered, setFiltered] = useState(false);

    const { handlerMap: { handleFilterChange: handleTaskFilterChange } } = useContext(TasksContext);
    const { handlerMap: { handleFilterChange: handleModuleFilterChange } } = useContext(ModulesContext);

    const handleFilterChange = (filterCriteria) => {
        if (props.type === 'task') {
            handleTaskFilterChange(filterCriteria);
        } else if (props.type === 'module') {
            handleModuleFilterChange(filterCriteria);
        }
        if (Object.keys(filterCriteria).length > 0) {
            setFiltered(true);
        } else {
            setFiltered(false);
        }
    };

    const handleFilterClear = () => {
        handleFilterChange({});
    };

    return (
        <div className="container headerPanel">
            <div className="panel">
                <span className="text">{props.type}</span>
            </div>
            <div className="buttonGroup">
                <Button variant={filtered ? "warning" : "light"}  className="button" onClick={() => setShowFilterModal(true)}>
                    <Icon path={mdiFilterVariant} size={1} />
                </Button>
                <Button variant="light" className="button" onClick={() => navigate('/'+props.type+'/new')}>
                    <Icon path={mdiPlusCircleOutline} size={1} />
                </Button>
            </div>
            <FilterModal 
                show={showFilterModal} 
                type={props.type}
                handleClose={() => setShowFilterModal(false)} 
                handleFilterClear={handleFilterClear} 
                handleFilterChange={handleFilterChange} 
            />
        </div>
    );
}

export default HeaderPanel;
