import { Link } from "react-router-dom";
import styles from "./no-screen.module.css";

export default function YesScreen() {
  return (
    <div className={styles.container}>
        <h1 className={styles.header}>Ты что-то попутал</h1>
        <img className={styles.cat} src={`/assets/cat-side-eye.gif`} />
          <Link to="/">
            <button className={styles.yesButton}>Исправить грех</button>
          </Link>
    </div>
  );
}
