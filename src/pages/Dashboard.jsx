import { useEffect, useState } from "react"
import Form from "../components/Form/Form"
import Tasks from "../components/Tasks/Tasks"
import Toast from "../components/Toast/Toast"
import styles from "./Dashboard.module.css"
import DeleteModal from "../components/Modals/DeleteModal"
import ViewTaskModal from "../components/Modals/ViewTaskModal"
import { getTasks, removeTask } from "../services/service"

function Dashboard() {

    const [tasks, setTasks] = useState([])
    const [selectedTask, setSelectedTask] = useState(null)
    const [mode, setMode] = useState("create")

    const [deleteTask, setDeleteTask] = useState(null)

    const [toast, setToast] = useState({ visible: false, message: "", type: "" })
    const [viewTask, setViewTask] = useState(null)

    function fetchTasks() {
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
        setSelectedTask(task)
        setMode("edit")
    }

    function resetEdit() {
        setSelectedTask(null)
        setMode("create")
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

                if (selectedTask?.id === deleteTask.id) {    // if same task is being edited, and also deleted- clears form
                    resetEdit()
                }
                setDeleteTask(null)

                setToast({ visible: true, message: "Task Deleted Successfully", type: "error" })
            })
            .catch((err) => console.log(err))
    }

    return (
        <>
            <div className={styles.formSection}>
                <Form mode={mode} selectedTaskData={selectedTask} refreshTasks={fetchTasks} resetEdit={resetEdit} setToast={setToast} />
            </div>

            <div className={styles.tasksSection}>

                {tasks.length === 0 ? (<h2 className={styles.emptyState}>No tasks found</h2>) : (<Tasks tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} onView={handleView} />)}

                {(deleteTask || viewTask) && (
                    <div className={styles.overlay}>
                        {deleteTask && ( <DeleteModal name={deleteTask.taskName} onCancel={cancelDelete} onConfirm={confirmDelete} /> )}
                        {viewTask && ( <ViewTaskModal onClose={setViewTask} taskName={viewTask.taskName} status={viewTask.statusType} statusType={viewTask.statusType} priority={viewTask.priority} taskType={viewTask.taskType} assigneeName={viewTask.assigneeName} assigneeEmail={viewTask.assigneeEmail} dueDate={viewTask.dueDate} dueTime={viewTask.dueTime} hours={viewTask.hours} url={viewTask.url} progress={viewTask.progress} description={viewTask.description} /> )}
                    </div>
                )}
            </div >

            <Toast visible={toast.visible} message={toast.message} type={toast.type} onClose={closeToast} />
        </>
    )
}

export default Dashboard