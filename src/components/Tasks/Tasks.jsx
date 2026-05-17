import styles from "./Tasks.module.css"
import TaskCard from "./TaskCards"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons"

function Tasks({ tasks = [] }) {

    const [activeColor, setActiveColor] = useState("all")  // active color for filter buttons

    const sampleTasks = [
        {
            id: 1,
            title: "Megan Sweet4",
            description: "fdsfgfgfgh",
            dueDate: "Jun 6, 2026",
            assignedTo: "Sydney Mann",
            priority: "medium",
            status: "In Progress"
        },

        {
            id: 2,
            title: "Jelani Banks",
            description: "Cillum illo omnis co",
            dueDate: "Aug 31, 2026",
            assignedTo: "Quinn Rios",
            priority: "low",
            status: "Pending"
        },
        {
            id: 3,
            title: "Ramji Sanmugam",
            description: "You've identified a common React performance issue! The Form re-renders on every input change, which causes all CustomInput components to re-render as well—even though they're memoized. Here are several solutions:",
            dueDate: "Mar 20, 2003",
            assignedTo: "Quinn Rios",
            priority: "high",
            status: "Completed"
        },
        {
            id: 4,
            title: "john wick",
            description: "which causes all CustomInput components to re-render as well—even though they're memoized. Here are several solutions:",
            dueDate: "Mar 20, 2003",
            assignedTo: "Quinn Rios",
            priority: "medium",
            status: "Completed"
        }
    ]


    const displayTasks = tasks.length > 0 ? tasks : sampleTasks

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

            <div className={styles.taskCards}>

                {filterTasks.map(task => (

                    <TaskCard
                        key={task.id}
                        task={task}
                    />

                ))}

            </div>

        </section>
    )
}

export default Tasks