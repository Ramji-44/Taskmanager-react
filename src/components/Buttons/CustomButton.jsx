import styles from "./Button.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function CustomButton({ text, type, className, onClick, icon }) {
    return (
        <button
            type={type}
            className={styles[className]}
            onClick={onClick}>
            <FontAwesomeIcon icon={icon}  className={styles.icon}/>
            {text}
        </button>
    )
}
export default CustomButton
