import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

import Container from "./Container";

import Logo from "../../assets/costs_logo.png";
import styles from "./Navbar.module.css";
import { useState } from "react";

export default function Navbar() {

    const [menu, setMenu] = useState(true);
    const [menuAberto, setMenuToggle] = useState(true);

    function menuToggle() {
        setMenu(!menu);
        setMenuToggle(!menuAberto);
    }

    return (
        <nav className={styles.navbar}>
            <Container>
                <Link to="/">
                    <img src={Logo} alt="logo costs" />
                </Link>
                <div className={styles.list}>
                    <ul className={`${styles.list} ${menu ? styles.menuClose : ""}`}>
                        <li className={styles.item}><Link to="/">Home</Link></li>
                        <li className={styles.item}><Link to="/projetos">Projetos</Link></li>
                        <li className={styles.item}><Link to="/empresa">Empresa</Link></li>
                        <li className={styles.item}><Link to="/contato">Contato</Link></li>
                    </ul>
                    <div className={styles.menu}>
                        <FaBars onClick={menuToggle} className={!menuAberto ? styles.menuOpen : ""} />
                    </div>
                </div>
            </Container>
        </nav>
    );
};