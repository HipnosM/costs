import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <ul className={styles.social_list}>
                <li><FaFacebook /></li>
                <li>
                    <a href="https://instagram.com/tryiago" target="_blank">
                        <FaInstagram />
                    </a>
                </li>
                <li><FaLinkedin /></li>
            </ul>
            <p className={styles.copyright}><span>Costs</span> &copy; 2023, by <span>Hipnos</span>, on Hora de Codar.</p>
        </footer>
    );
};