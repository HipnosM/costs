import styles from "./Home.module.css";

import Savings from "../../assets/savings.svg";
import LinkButton from "../layout/LinkButton";

export default function Home() {
    return (
        <section className={styles.home_container}>
            <h1>Bem-vindo(a) ao <span>Costs</span></h1>
            <p>Comece a gerenciar seus projetos agora mesmo!</p>
            <LinkButton to="/novo-projeto" text="Criar projeto" />
            <img src={Savings} alt="costs hero" />
        </section>
    );
};