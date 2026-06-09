import styles from "./Tasks.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare, faTrash, faCalendarDays, faUser } from "@fortawesome/free-solid-svg-icons"
import { formatStatus, formatDate } from "../../utils/helper"

function TaskCards({ task, onEdit, onDelete, onView }) {
    
    return (
        <div className={styles.card} onClick={() => onView(task)}>

            <div className={styles.cardHeader}>
                <h3 className={styles.title}>{task.taskName}</h3>

                <div className={styles.actions}>
                    <button className={styles.editBtn} onClick={(e) => {
                        e.stopPropagation()
                        onEdit(task)
                    }} >
                        <FontAwesomeIcon icon={faPenToSquare} /></button>

                    <button className={styles.deleteBtn} onClick={(e) => {
                        e.stopPropagation()
                        onDelete(task)
                    }}>
                        <FontAwesomeIcon icon={faTrash} /></button>
                </div>
            </div>

            <p className={styles.description}>{task.description}</p>

            <div className={styles.dataNameIcon}>
                <FontAwesomeIcon icon={faCalendarDays} className={styles.calenderIcon} />
                <span>Due: {formatDate(task.dueDate)}</span>
            </div>

            <div className={styles.dataNameIcon}>
                <FontAwesomeIcon icon={faUser} className={styles.userIcon} /><span>{task.assigneeName}</span>
            </div>

            <hr className={styles.hrLine} />

            <div className={styles.priorityStatus}>

                <div className={`${styles.priority} ${styles[task.priority]}`}>
                    <span className={styles.dot}></span>
                    <span>
                        {task.priority.toUpperCase()}
                    </span>
                </div>

                <div className={`${styles.status} ${styles[task.statusType]}`}>
                    <span className={styles.statusDot}></span>
                    <span>{formatStatus(task.statusType)}</span>
                </div>

            </div>

        </div>
    )
}

export default TaskCards