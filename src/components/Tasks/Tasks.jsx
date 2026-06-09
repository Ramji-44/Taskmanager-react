import styles from "./Tasks.module.css"
import TaskCards from "./TaskCards"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons"

function Tasks({ tasks = [], onEdit, onDelete, onView }) {

    const [activeColor, setActiveColor] = useState("all")  // active color for filter buttons

    const displayTasks = tasks

    const highCount = displayTasks.filter(task => task.priority === "high").length

    const mediumCount = displayTasks.filter(task => task.priority === "medium").length

    const lowCount = displayTasks.filter(task => task.priority === "low").length

    const filterTasks = activeColor === "all" ? displayTasks : displayTasks.filter((task) => task.priority === activeColor)

    return (

        <section className={styles.tasksContainer}>

            <div className={styles.topBar}>

                <h3 className={styles.heading}>
                    <FontAwesomeIcon icon={faCircleCheck} className={styles.faCircleCheck} />
                    Active Tasks</h3>

                <div className={styles.filterBtns}>
                    <button className={activeColor === "all" ? styles.active : ""} onClick={() => setActiveColor("all")}>All<span>{displayTasks.length}</span></button>

                    <button className={activeColor === "high" ? styles.active : ""} onClick={() => setActiveColor("high")} >High<span>{highCount}</span></button>

                    <button className={activeColor === "medium" ? styles.active : ""} onClick={() => setActiveColor("medium")}>Medium<span>{mediumCount}</span></button>

                    <button className={activeColor === "low" ? styles.active : ""} onClick={() => setActiveColor("low")}>Low<span>{lowCount}</span></button>

                </div>
            </div>

            <div className={styles.scrollBar}>
                <div className={styles.taskCards}>
                    {filterTasks.length === 0 ? (<p className={styles.noTasks}> No Task Found</p>) : (filterTasks.map(task => (<TaskCards key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} onView={onView} />)))}
                </div>
            </div>

        </section>
    )
}

export default Tasks