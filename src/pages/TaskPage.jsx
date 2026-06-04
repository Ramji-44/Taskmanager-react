import { useEffect, useState } from "react"
import Form from "../components/Form/Form"
import Tasks from "../components/Tasks/Tasks"
import Toast from "../components/Toast/Toast"
import styles from "./TaskPage.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare, faTrash, faCircleUser, faEnvelope, faCalendarDays, faClock, faFlag, faStopwatch, faLink, faChartLine, faLayerGroup, faHourglassHalf, faAlignLeft, faColonSign, faFileLines } from "@fortawesome/free-solid-svg-icons"
import { formatPriority, formatTaskType, formatStatus, formatDate } from "../utils/displayFormat"
import DeleteModal from "../components/Modals/DeleteModal"

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
            <div className={styles.formSection}>
                <Form mode={mode} initialData={selectedTask} refreshTasks={fetchTasks} setMode={setMode} clearEdit={resetEdit} setToast={setToast} />
            </div>

            <div className={styles.tasksSection}>

                {tasks.length === 0 ? (<h2 className={styles.emptyState}>No tasks found</h2>) : (<Tasks tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} onView={handleView} />)}

                {/* delete modal  */}
                {delConfirmMsg && (
                    <DeleteModal name={deleteTask.taskName} onCancel={cancelDelete} onConfirm={confirmDelete} />
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

                            <div className={styles.taskNameBox}>
                                <div className={styles.label}> <FontAwesomeIcon icon={faFileLines} className={styles.iconTask} />Task Name</div>
                                <h3>{viewTask.taskName}</h3>
                            </div>

                            <div className={styles.priorityStatus}>
                                <div className={styles.fields}>
                                    <div className={styles.label}> <FontAwesomeIcon icon={faHourglassHalf} className={styles.iconStype} />Status</div>
                                    <span className={`${styles.statusBg} ${styles[viewTask.statusType]}`}>{formatStatus(viewTask.statusType)} </span>
                                </div>

                                <div className={styles.fields}>
                                    <div className={styles.label}> <FontAwesomeIcon icon={faFlag} className={styles.iconPrior} />Priority</div>
                                    <div className={`${styles.priorityBg} ${styles[viewTask.priority]}`}>{formatPriority(viewTask.priority)}</div>
                                </div>
                            </div>

                            <div className={styles.taskTypes}>
                                <div className={styles.label}> <FontAwesomeIcon icon={faLayerGroup} className={styles.iconTType} />Task Type</div>
                                <div className={styles.value}>{formatTaskType(viewTask.taskType)}</div>
                            </div>

                            <div className={styles.nameEmail}>
                                <div className={styles.fields}>
                                    <div className={styles.label}> <FontAwesomeIcon icon={faCircleUser} className={styles.iconName} />Assignee Name</div>
                                    <span className={styles.value}>{viewTask.assigneeName}</span>
                                </div>

                                <div className={styles.fields}>
                                    <div className={styles.label}> <FontAwesomeIcon icon={faEnvelope} className={styles.iconEmail} />Assignee Email</div>
                                    <span className={styles.value}>{viewTask.assigneeEmail}</span>
                                </div>
                            </div>

                            <div className={styles.dateTimeHour}>
                                <div className={styles.fields}>
                                    <div className={styles.label}> <FontAwesomeIcon icon={faCalendarDays} className={styles.iconDate} />Due Date</div>
                                    <span className={styles.value}>{formatDate(viewTask.dueDate)}</span>
                                </div>

                                <div className={styles.fields}>
                                    <div className={styles.label}> <FontAwesomeIcon icon={faClock} className={styles.iconTime} />Due Time</div>
                                    <span className={styles.value}>{viewTask.dueTime}</span>
                                </div>

                                <div className={styles.fields}>
                                    <div className={styles.label}> <FontAwesomeIcon icon={faStopwatch} className={styles.iconHours} />Hours</div>
                                    <span className={styles.value}>{viewTask.hours} hrs</span>
                                </div>
                            </div>

                            <div className={styles.taskUrl}>
                                <div className={styles.label}> <FontAwesomeIcon icon={faLink} className={styles.iconUrl} />URL</div>
                                <span className={styles.value}> <a href={viewTask.url} target="_blank" >{viewTask.url}</a></span>
                            </div>

                            <div className={styles.taskProgress}>
                                <div className={styles.label}> <FontAwesomeIcon icon={faChartLine} className={styles.iconPro} />Task Progress</div>
                                <span className={styles.ProgressValue}>{viewTask.progress} %</span>
                            </div>

                            <div className={styles.progressContainer}>
                                <progress value={viewTask.progress} max="100" className={styles.progressBar} />
                            </div>


                            <div className={` ${styles.fields} ${styles.descriptionField}`}>
                                <div className={styles.label}><FontAwesomeIcon icon={faAlignLeft} className={styles.iconDes} />Task Description  </div>
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