import { Link } from "react-router-dom";
import Container from "./Container";

import Logo from "../../assets/costs_logo.png";
import styles from "./Navbar.module.css";

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <Container>
                <Link to="/">
                    <img src={Logo} alt="logo costs" />
                </Link>
                <ul className={styles.list}>
                    <li className={styles.item}><Link to="/">Home</Link></li>
                    <li className={styles.item}><Link to="/projetos">Projetos</Link></li>
                    <li className={styles.item}><Link to="/empresa">Empresa</Link></li>
                    <li className={styles.item}><Link to="/contato">Contato</Link></li>
                </ul>
            </Container>
        </nav>
    );
};