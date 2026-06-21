import styles from "./Tasks.module.css"
import TaskCards from "./TaskCards"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons"

function Tasks({ tasks = [], onEdit, onDelete, onView }) {

    const [priorityBtn, setPriorityBtn] = useState("all")  // active filter buttons

    const displayTasks = tasks

    const highCount = displayTasks.filter(task => task.priority === "high").length

    const mediumCount = displayTasks.filter(task => task.priority === "medium").length

    const lowCount = displayTasks.filter(task => task.priority === "low").length

    const filterTasks = priorityBtn === "all" ? displayTasks : displayTasks.filter((task) => task.priority === priorityBtn)

    return (

        <section className={styles.tasksContainer}>

            <div className={styles.topBar}>

                <h3 className={styles.heading}>
                    <FontAwesomeIcon icon={faCircleCheck} className={styles.faCircleCheck} />
                    Active Tasks</h3>

                <div className={styles.filterBtns}>
                    <button className={priorityBtn === "all" ? styles.active : ""} onClick={() => setPriorityBtn("all")}>All<span>{displayTasks.length}</span></button>

                    <button className={priorityBtn === "high" ? styles.active : ""} onClick={() => setPriorityBtn("high")} >High<span>{highCount}</span></button>

                    <button className={priorityBtn === "medium" ? styles.active : ""} onClick={() => setPriorityBtn("medium")}>Medium<span>{mediumCount}</span></button>

                    <button className={priorityBtn === "low" ? styles.active : ""} onClick={() => setPriorityBtn("low")}>Low<span>{lowCount}</span></button>

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