import styles from "./Loader.module.css";

import loading from "../../assets/loading.svg";

export default function Loader() {
    return (
        <div className={styles.loader_container}>
            <img className={styles.loader} src={loading} alt="loading svg" />
        </div>
    );
};