import styles from "./Pages.module.css"
import { Link } from "react-router-dom"

function NotFound() {
    return (
        <div className={styles.container}>
            <div className={styles.NotFound}>
                <p>404</p>
                <p>Page Not Found</p>
                <Link to="/"><button type="button">Go DashBoard</button></Link>
            </div>
        </div>
    )
}
export default NotFound