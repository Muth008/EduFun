import React from "react";
import styles from "../../assets/css/headerPanel/HeaderPanel.module.css";
import Icon from "@mdi/react";
import { mdiFilterVariant, mdiPlusCircleOutline } from "@mdi/js";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function HeaderPanel(props) {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <div className={styles.panel}>
                <span className={styles.text}>{props.type}</span>
            </div>
            <div className={styles.buttonGroup}>
                <Button variant="light" className={styles.button}>
                    <Icon path={mdiFilterVariant} size={1} />
                </Button>
                <Button variant="light" className={styles.button} onClick={() => navigate('/'+props.type+'/new')}>
                    <Icon path={mdiPlusCircleOutline} size={1} />
                </Button>
            </div>
        </div>
    );
}

export default HeaderPanel;
