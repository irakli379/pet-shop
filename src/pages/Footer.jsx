import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Link to="/donate" className={styles.footerLink}>
        Donate
      </Link>
      <Link to="/aboutUs" className={styles.footerLink}>
        About Us
      </Link>
    </footer>
  );
}
