import React from "react";
import styles from "../../assets/css/headerPanel/HeaderPanel.module.css";
import Icon from "@mdi/react";
import { mdiFilterVariant, mdiPlusCircleOutline } from "@mdi/js";
import { Button } from "react-bootstrap";

function HeaderPanel(props) {
    return (
        <div className={styles.container}>
            <div className={styles.panel}>
                <span className={styles.text}>{props.text}</span>
            </div>
            <div className={styles.buttonGroup}>
                <Button variant="light" className={styles.button}>
                    <Icon path={mdiFilterVariant} size={1} />
                </Button>
                <Button variant="light" className={styles.button}>
                    <Icon path={mdiPlusCircleOutline} size={1} />
                </Button>
            </div>
        </div>
    );
}

export default HeaderPanel;
