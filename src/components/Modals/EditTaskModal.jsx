import styles from "./Modal.module.css"
import EditForm from "../Form/EditForm"

function EditTaskModal({ task, onClose, refreshTasks, setToast }) {

    return (
        <div className={styles.editTaskModal}>
            {task && (               // render form, when task is selected
                <EditForm task={task} key={task.id}
                    refreshTasks={refreshTasks}
                    onClose={onClose}
                    setToast={setToast} />
            )}
        </div>
    )
}

export default EditTaskModal