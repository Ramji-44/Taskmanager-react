import { useEffect, useState } from "react"
import Form from "../components/Form/Form"
import Tasks from "../components/Tasks/Tasks"
import Toast from "../components/Toast/Toast"
import styles from "./Pages.module.css"
import DeleteModal from "../components/Modals/DeleteModal"
import ViewTaskModal from "../components/Modals/ViewTaskModal"
import EditTaskModal from "../components/Modals/EditTaskModal"
import { getTasks, removeTask } from "../services/service"

function Dashboard() {

    const [tasks, setTasks] = useState([])
    const [viewTask, setViewTask] = useState(null)
    const [editTask, setEditTask] = useState(null)
    const [deleteTask, setDeleteTask] = useState(null)
    const [toast, setToast] = useState({ visible: false, message: "", type: "" })

    function fetchTasks() {   // GET request
        getTasks()
            .then((data) => {
                setTasks(data.reverse())
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        fetchTasks()
    }, [])

    function handleEdit(task) {
        setEditTask(task)
    }

    function handleDelete(task) {
        setDeleteTask(task)
    }

    function cancelDelete() {
        setDeleteTask(null)
    }

    function handleView(task) {
        setViewTask(task)
    }

    function closeToast() {
        setToast((prev) => ({ ...prev, visible: false }))
    }


    function confirmDelete() {
        removeTask(deleteTask)
            .then(() => {
                setTasks((prev) => prev.filter((task) => task.id !== deleteTask.id))

                if (editTask?.id === deleteTask.id) {    // if same task is being edited, and also deleted- clears form
                    setEditTask(null)
                }
                setDeleteTask(null)

                setToast({ visible: true, message: "Task Deleted Successfully", type: "error" })
            })
            .catch((err) => console.log(err))
    }

    return (
        <>
            <div className={styles.formSection}>
                <Form refreshTasks={fetchTasks} setToast={setToast} />
            </div>

            <div className={styles.tasksSection}>

                {tasks.length === 0 ? (<h2 className={styles.emptyState}>No tasks found</h2>) : (<Tasks tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} onView={handleView} />)}

                {editTask && (<div className={styles.overlay}>
                    <EditTaskModal task={editTask} onClose={() => setEditTask(null)} refreshTasks={fetchTasks} setToast={setToast} />
                </div>
                )}

                {(deleteTask || viewTask) && (
                    <div className={styles.overlay}>
                        {deleteTask && (<DeleteModal name={deleteTask.taskName} onCancel={cancelDelete} onConfirm={confirmDelete} />)}
                        {viewTask && (<ViewTaskModal onClose={setViewTask} taskName={viewTask.taskName} status={viewTask.statusType} priority={viewTask.priority} taskType={viewTask.taskType} assigneeName={viewTask.assigneeName} assigneeEmail={viewTask.assigneeEmail} dueDate={viewTask.dueDate} dueTime={viewTask.dueTime} hours={viewTask.hours} url={viewTask.url} progress={viewTask.progress} description={viewTask.description} />)}
                    </div>
                )}
            </div >

            <Toast visible={toast.visible} message={toast.message} type={toast.type} onClose={closeToast} />
        </>
    )
}

export default Dashboard