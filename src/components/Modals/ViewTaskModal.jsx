import styles from "./Modal.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare, faTrash, faCircleUser, faEnvelope, faCalendarDays, faClock, faFlag, faStopwatch, faLink, faChartLine, faLayerGroup, faHourglassHalf, faAlignLeft, faColonSign, faFileLines } from "@fortawesome/free-solid-svg-icons"
import { formatPriority, formatTaskType, formatStatus, formatDate } from "../../utils/displayFormat"


export default function ViewTaskModal({ onClose, taskName, status, priority, taskType, assigneeName, assigneeEmail, dueDate, dueTime, hours, url, progress, description }) {

    return (
        <div className={styles.viewtaskmodal}>

            <div className={styles.header}>
                <button className={styles.editBtn}><FontAwesomeIcon icon={faPenToSquare} /></button>
                <button className={styles.deleteBtn}><FontAwesomeIcon icon={faTrash} /></button>
                <button className={styles.closeBtn} onClick={() => onClose(null)}>close</button>
            </div>

            <div className={styles.taskNameBox}>
                <div className={styles.label}> <FontAwesomeIcon icon={faFileLines} className={styles.iconTask} />Task Name</div>
                <h3>{taskName}</h3>
            </div>

            <div className={styles.priorityStatus}>
                <div className={styles.fields}>
                    <div className={styles.label}> <FontAwesomeIcon icon={faHourglassHalf} className={styles.iconStype} />Status</div>
                    <span className={`${styles.statusBg} ${styles[status]}`}>{formatStatus(status)} </span>
                </div>

                <div className={styles.fields}>
                    <div className={styles.label}> <FontAwesomeIcon icon={faFlag} className={styles.iconPrior} />Priority</div>
                    <div className={`${styles.priorityBg} ${styles[priority]}`}>{formatPriority(priority)}</div>
                </div>
            </div>

            <div className={styles.taskTypes}>
                <div className={styles.label}> <FontAwesomeIcon icon={faLayerGroup} className={styles.iconTType} />Task Type</div>
                <div className={styles.value}>{formatTaskType(taskType)}</div>
            </div>

            <div className={styles.nameEmail}>
                <div className={styles.fields}>
                    <div className={styles.label}> <FontAwesomeIcon icon={faCircleUser} className={styles.iconName} />Assignee Name</div>
                    <span className={styles.value}>{assigneeName}</span>
                </div>

                <div className={styles.fields}>
                    <div className={styles.label}> <FontAwesomeIcon icon={faEnvelope} className={styles.iconEmail} />Assignee Email</div>
                    <span className={styles.value}>{assigneeEmail}</span>
                </div>
            </div>

            <div className={styles.dateTimeHour}>
                <div className={styles.fields}>
                    <div className={styles.label}> <FontAwesomeIcon icon={faCalendarDays} className={styles.iconDate} />Due Date</div>
                    <span className={styles.value}>{formatDate(dueDate)}</span>
                </div>

                <div className={styles.fields}>
                    <div className={styles.label}> <FontAwesomeIcon icon={faClock} className={styles.iconTime} />Due Time</div>
                    <span className={styles.value}>{dueTime}</span>
                </div>

                <div className={styles.fields}>
                    <div className={styles.label}> <FontAwesomeIcon icon={faStopwatch} className={styles.iconHours} />Hours</div>
                    <span className={styles.value}>{hours} hrs</span>
                </div>
            </div>

            <div className={styles.taskUrl}>
                <div className={styles.label}> <FontAwesomeIcon icon={faLink} className={styles.iconUrl} />URL</div>
                <span className={styles.value}> <a href={url} target="_blank" >{url}</a></span>
            </div>

            <div className={styles.taskProgress}>
                <div className={styles.label}> <FontAwesomeIcon icon={faChartLine} className={styles.iconPro} />Task Progress</div>
                <span className={styles.ProgressValue}>{progress} %</span>
            </div>

            <div className={styles.progressContainer}>
                <progress value={progress} max="100" className={styles.progressBar} />
            </div>


            <div className={` ${styles.fields} ${styles.descriptionField}`}>
                <div className={styles.label}><FontAwesomeIcon icon={faAlignLeft} className={styles.iconDes} />Task Description  </div>
                <div className={styles.descriptionBox}>
                    {description}
                </div>
            </div>

        </div>
    )
}

