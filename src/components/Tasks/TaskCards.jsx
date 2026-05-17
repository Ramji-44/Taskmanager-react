import styles from "./Tasks.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare, faTrash, faCalendarDays, faUser } from "@fortawesome/free-solid-svg-icons"

function TaskCard({ task }) {

    const statusMap = {
        "In Progress": "inprogress",
        "Completed": "completed",
        "Pending": "pending"
    };

    const statusKey = statusMap[task.status];

    return (
        <div className={styles.card}>

            <div className={styles.cardHeader}>
                <h3 className={styles.title}>{task.title}</h3>

                <div className={styles.actions}>
                    <button className={styles.editBtn}><FontAwesomeIcon icon={faPenToSquare} /></button>
                    <button className={styles.deleteBtn}><FontAwesomeIcon icon={faTrash} /></button>
                </div>
            </div>

            <p className={styles.description}>{task.description}</p>

            <div className={styles.dataNameIcon}>
                <FontAwesomeIcon icon={faCalendarDays} className={styles.calenderIcon}/>
                <span>Due: {task.dueDate}</span>
            </div>

            <div className={styles.dataNameIcon}>
                <FontAwesomeIcon icon={faUser} className={styles.userIcon} /><span>{task.assignedTo}</span>
            </div>

            <hr className={styles.hrLine} />

            <div className={styles.priorityStatus}>

                <div className={`${styles.priority} ${styles[task.priority]}`}>
                    <span className={styles.dot}></span>
                    <span>
                        {task.priority.toUpperCase()}
                    </span>
                </div>

                <div className={`${styles.status} ${styles[statusKey]}`}>
                    <span className={styles.statusDot}></span>
                    <span>{task.status}</span>
                </div>

            </div>

        </div>
    )
}

export default TaskCard