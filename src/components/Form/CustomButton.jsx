import styles from "./Form.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function CustomButton({ text, type, className, onClick, icon }) {
    return (
        <button
            type={type}
            className={className}
            onClick={onClick}>
            <FontAwesomeIcon icon={icon} />
            {text}
        </button>
    )
}
export default CustomButton
