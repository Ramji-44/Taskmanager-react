import styles from "./Modal.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import EditForm from "../Form/EditForm"

function EditTaskModal({ task, onClose, refreshTasks, setToast }) {

    return(
        <div className={styles.editTaskModal}>
            {task && (               // render form, when task is selected
                <EditForm task={task}
                 refreshTasks={refreshTasks} 
                 onClose={onClose} 
                 setToast={setToast} />
             )}
        </div>
    )
}

export default EditTaskModal