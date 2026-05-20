import { useEffect, useState } from "react"
import Form from "../components/Form/Form"
import Tasks from "../components/Tasks/Tasks"
import Toast from "../components/Toast/Toast"
import styles from "./TaskPage.module.css"

function TaskPage() {

    const [tasks, setTasks] = useState([])
    const [selectedTask, setSelectedTask] = useState(null)
    const [mode, setMode] = useState("create")

    const [delConfirmMsg, setDelConfirmMsg] = useState(false)
    const [deleteTask, setDeleteTask] = useState(null)

    const [toast, setToast] = useState({ visible: false, message: "", type: "" })


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
                <Tasks tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} />

                {delConfirmMsg && (
                    <div className={styles.overlay}>

                        <div className={styles.confirmBox}>
                            <p>"This action will permanently delete this task"</p>

                            <div className={styles.deleteText}>
                                <span>Are you sure want delete </span>
                                <h4>{deleteTask.taskName} ?</h4>
                            </div>

                            <div className={styles.modalBtns}>
                                <button onClick={cancelDelete} className={styles.cancelBtn} >Cancel</button>
                                <button onClick={confirmDelete} className={styles.deleteBtn} >Delete</button>
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