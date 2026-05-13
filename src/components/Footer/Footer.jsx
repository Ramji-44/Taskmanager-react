import styles from "./Footer.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import icons from "../../utils/Fontawesome"

export default function Footer() {
    return (
        <>
            <footer>
                <div className={styles.footerContainer}>

                    <div>
                        <h4>TaskManager</h4>
                        <ul><li>Organize your work and life, finally.</li></ul>
                    </div>

                    <div>
                        <h4>Features</h4>
                        <ul>
                            <li>Task Management</li>
                            <li>Team Collaboration</li>
                            <li>Analytics</li>
                            <li>Integrations</li>
                        </ul>
                    </div>

                    <div>
                        <h4>Resources</h4>
                        <ul>
                            <li>Documentation</li>
                            <li>Tutorials</li>
                            <li>API Reference</li>
                            <li>Support</li>
                        </ul>
                    </div>

                    <div>
                        <h4>Company</h4>
                        <ul>
                            <li>About Us</li>
                            <li>Careers</li>
                            <li>Privacy Policy</li>
                            <li>Terms of Service</li>
                        </ul>
                    </div>

                </div>

                <div className={styles.copyRights}>
                    <hr />
                    <p>© {new Date().getFullYear()} TaskManager. All rights reserved. Built with   <FontAwesomeIcon icon={icons.heart} className={styles.heartIcon} /> for productivity.</p>
                </div>
            </footer>
        </>
    )
}

