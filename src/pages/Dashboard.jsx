import { useEffect, useState } from "react"
import Form from "../components/Form/Form"
import Tasks from "../components/Tasks/Tasks"
import Toast from "../components/Toast/Toast"
import styles from "./Dashboard.module.css"

import DeleteModal from "../components/Modals/DeleteModal"
import ViewTaskModal from "../components/Modals/ViewTaskModal"

function Dashboard() {

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
                    <ViewTaskModal onClose={setViewTask} taskName={viewTask.taskName} status={viewTask.statusType} statusType={viewTask.statusType} priority={viewTask.priority} taskType={viewTask.taskType} assigneeName={viewTask.assigneeName} assigneeEmail={viewTask.assigneeEmail} dueDate={viewTask.dueDate} dueTime={viewTask.dueTime} hours ={viewTask.hours} url={viewTask.url} progress={viewTask.progress} description={viewTask.description}/>
                )}
            </div >

            <Toast visible={toast.visible} message={toast.message} type={toast.type} onClose={closeToast} />
        </>
    )
}

export default Dashboard