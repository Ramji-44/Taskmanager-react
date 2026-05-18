import { useEffect } from "react";
import styles from "./Toast.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleXmark, faXmark } from "@fortawesome/free-solid-svg-icons";

function Toast({ message, type = "success", visible, onClose }) {

    useEffect(() => {

        if (!visible) return

        const timer = setTimeout(() => {
            onClose()
        }, 3000)

        return () => clearTimeout(timer)

    }, [visible, onClose])

    if (!visible) return null

    const icons = {
        success: faCircleCheck,
        error: faCircleXmark
    }

    return (

        <div className={`${styles.toast} ${styles[type]}`}>
            <div className={styles.content}>

                <div className={styles.toastMessage}>
                    <FontAwesomeIcon icon={icons[type]} className={styles.icon} />
                    <p>{message}</p>
                </div>

                <button className={styles.closeBtn} onClick={onClose}>
                    <FontAwesomeIcon icon={faXmark} />
                </button>
            </div>

            <div className={styles.progressBar} style={{ animationDuration: `{duration}ms` }}> </div>
        </div>

    )
}

export default Toast