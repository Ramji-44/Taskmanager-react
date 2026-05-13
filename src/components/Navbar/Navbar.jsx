import { useState } from "react"
import styles from "./Navbar.module.css"

function Navbar() {

    const [openMenu, setOpenMenu] = useState(false)

    return (
        <header>

            <div className={styles.logoTitle}>
                <span className={styles.logo}>TM</span>
                <h2>TaskManager</h2>
            </div>

            <div className={`${styles.menuBar} ${openMenu ? styles.active : ""}`} onClick={() => setOpenMenu(!openMenu)} >  {/* !openmenu = true, show menu */}
                <span className={styles.menuLine}></span>
                <span className={styles.menuLine}></span>
                <span className={styles.menuLine}></span>
            </div>

            <nav className={`${styles.navLinks} ${openMenu ? styles.showMenu : ""}`} >
                <ul>
                    <li className={styles.highLight}>Dashboard</li>
                    <li>Tasks</li>
                    <li>Profile</li>
                </ul>
            </nav>

        </header>
    )
}

export default Navbar