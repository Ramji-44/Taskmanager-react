import { useEffect, useState } from "react"
import Form from "../components/Form/Form"
import Tasks from "../components/Tasks/Tasks"
import Toast from "../components/Toast/Toast"
import styles from "./TaskPage.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare, faTrash, faCircleUser, faEnvelope, faCalendarDays, faClock, faFlag, faStopwatch, faLink, faChartLine, faLayerGroup, faHourglassHalf, faAlignLeft, faColonSign } from "@fortawesome/free-solid-svg-icons"
import { formatPriority, formatTaskType, formatStatus, formatDate } from "../utils/displayFormat"


function TaskPage() {

    const [tasks, setTasks] = useState([])
    const [selectedTask, setSelectedTask] = useState(null)
    const [mode, setMode] = useState("create")

    const [delConfirmMsg, setDelConfirmMsg] = useState(false)
    const [deleteTask, setDeleteTask] = useState(null)

    const [toast, setToast] = useState({ visible: false, message: "", type: "" })
    const [viewTask, setViewTask] = useState(null)

    function fetchTasks() {
        fetch("http://localhost:4000/tasks")
            .then((res) => res.json())
            .then((data) => {
                console.log("fetching data ................. ", data)
                setTasks(data.reverse())
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        fetchTasks()
    }, [])

    console.log("useEffect runned ................", tasks)

    function handleEdit(task) {
        setSelectedTask(task)
        setMode("edit")
    }

    function resetEdit() {
        setSelectedTask(null)
        setMode("create")
    }

    function handleDelete(task) {
        setDeleteTask(task)
        setDelConfirmMsg(true)
    }

    function cancelDelete() {
        setDelConfirmMsg(false)
        setDeleteTask(null)
    }

    function handleView(task) {
        setViewTask(task)
    }

    function closeToast() {
        setToast((prev) => ({ ...prev, visible: false }))
    }


    function confirmDelete() {
        fetch(`http://localhost:4000/tasks/${deleteTask.id}`, {
            method: "DELETE"
        })
            .then((res) => res.json())
            .then(() => {
                setTasks((prev) => prev.filter((task) => task.id !== deleteTask.id))

                setDelConfirmMsg(false)
                setDeleteTask(null)

                setToast({ visible: true, message: "Task Deleted Successfully", type: "error" })
            })
            .catch((err) => console.log(err))
    }

    return (
        <>
            <div className="form-section">
                <Form mode={mode} initialData={selectedTask} refreshTasks={fetchTasks} setMode={setMode} clearEdit={resetEdit} setToast={setToast} />
            </div>

            <div className={`tasks-section ${styles.tasksSection}`}>
                <Tasks tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} onView={handleView} />

                {/* delete modal  */}
                {delConfirmMsg && (
                    <div className={styles.overlay}>

                        <div className={styles.confirmBox}>
                            <p>"This action will permanently delete this task"</p>

                            <div className={styles.deleteText}>
                                <span>Are you sure want to delete </span>
                                <h4>{deleteTask.taskName} ?</h4>
                            </div>

                            <div className={styles.modalBtns}>
                                <button onClick={cancelDelete} className={styles.cancelBtn} >Cancel</button>
                                <button onClick={confirmDelete} className={styles.deleteBtn} >Delete</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* view task modal */}
                {viewTask && (
                    <div className={styles.overlay}>
                        <div className={styles.viewtaskmodal}>

                            <div className={styles.header}>
                                <button className={styles.editBtn}><FontAwesomeIcon icon={faPenToSquare} /></button>
                                <button className={styles.deleteBtn}><FontAwesomeIcon icon={faTrash} /></button>
                                <button className={styles.closeBtn} onClick={() => setViewTask(null)}>close</button>
                            </div>

                            <h3>{viewTask.taskName}</h3>

                            <div className={styles.fields}>
                                <div className={styles.label}> <FontAwesomeIcon icon={faCircleUser} className={styles.iconName} />Assignee Name</div>
                                <span className={styles.colon}>:</span>
                                <span className={styles.value}>{viewTask.assigneeName}</span>
                            </div>

                            <div className={styles.fields}>
                                <div className={styles.label}> <FontAwesomeIcon icon={faEnvelope} className={styles.iconEmail} />Assignee Email</div>
                                <span className={styles.colon}>:</span>
                                <span className={styles.value}>{viewTask.assigneeEmail}</span>
                            </div>

                            <div className={styles.fields}>
                                <div className={styles.label}> <FontAwesomeIcon icon={faCalendarDays} className={styles.iconDate} />Due Date</div>
                                <span className={styles.colon}>:</span>
                                <span className={styles.value}>{formatDate(viewTask.dueDate)}</span>
                            </div>

                            <div className={styles.fields}>
                                <div className={styles.label}> <FontAwesomeIcon icon={faClock} className={styles.iconTime} />Due Time</div>
                                <span className={styles.colon}>:</span>
                                <span className={styles.value}>{viewTask.dueTime}</span>
                            </div>

                            <div className={styles.fields}>
                                <div className={styles.label}> <FontAwesomeIcon icon={faFlag} className={styles.iconPrior} />Priority</div>
                                <span className={styles.colon}>:</span>
                                <span className={`${styles.priorityBg} ${styles[viewTask.priority]}`}>{formatPriority(viewTask.priority)}</span>
                            </div>

                            <div className={styles.fields}>
                                <div className={styles.label}> <FontAwesomeIcon icon={faStopwatch} className={styles.iconHours} />Hours</div>
                                <span className={styles.colon}>:</span>
                                <span className={styles.value}>{viewTask.hours} hrs</span>
                            </div>

                            <div className={styles.fields}>
                                <div className={styles.label}> <FontAwesomeIcon icon={faLink} className={styles.iconUrl} />URL</div>
                                <span className={styles.colon}>:</span>
                                <span className={styles.value}> <a href={viewTask.url} target="_blank" >Project Link</a></span>
                            </div>

                            <div className={styles.fields}>
                                <div className={styles.label}> <FontAwesomeIcon icon={faChartLine} className={styles.iconPro} />Progress</div>
                                <span className={styles.colon}>:</span>
                                <span className={styles.value}>{viewTask.progress} %</span>
                            </div>

                            <div className={styles.fields}>
                                <div className={styles.label}> <FontAwesomeIcon icon={faLayerGroup} className={styles.iconTType} />Task Type</div>
                                <span className={styles.colon}>:</span>
                                <span className={styles.value}>{formatTaskType(viewTask.taskType)}</span>
                            </div>

                            <div className={styles.fields}>
                                <div className={styles.label}> <FontAwesomeIcon icon={faHourglassHalf} className={styles.iconStype} />Status Type</div>
                                <span className={styles.colon}>:</span>
                                <span className={`${styles.statusBg} ${styles[viewTask.statusType]}`}>{formatStatus(viewTask.statusType)} </span>
                            </div>

                            <div className={` ${styles.fields} ${styles.descriptionField}`}>
                                <div className={styles.label}><FontAwesomeIcon icon={faAlignLeft} className={styles.iconDes} />Description  </div>
                                <span className={styles.colon}>:</span>
                                <div className={styles.descriptionBox}>
                                    {viewTask.description}
                                </div>
                            </div>

                        </div>
                    </div>
                )}
            </div >

            <Toast visible={toast.visible} message={toast.message} type={toast.type} onClose={closeToast} />
        </>
    )
}

export default TaskPage