import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleExclamation} from "@fortawesome/free-solid-svg-icons"
import styles from "./Form.module.css"

function CustomValidation({message}){
    return(
        <span className={styles.errorBlock} ><FontAwesomeIcon icon={faCircleExclamation}/><small>{message}</small></span>      
    )
}

export default CustomValidation