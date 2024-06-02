import React from "react";
import "../../assets/css/headerPanel/HeaderPanel.css";
import Icon from "@mdi/react";
import { mdiFilterVariant, mdiPlusCircleOutline } from "@mdi/js";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function HeaderPanel(props) {
    const navigate = useNavigate();

    return (
        <div className="container headerPanel">
            <div className="panel">
                <span className="text">{props.type}</span>
            </div>
            <div className="buttonGroup">
                <Button variant="light" className="button">
                    <Icon path={mdiFilterVariant} size={1} />
                </Button>
                <Button variant="light" className="button" onClick={() => navigate('/'+props.type+'/new')}>
                    <Icon path={mdiPlusCircleOutline} size={1} />
                </Button>
            </div>
        </div>
    );
}

export default HeaderPanel;
