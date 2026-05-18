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
            description: "may god bless you",
            dueDate: "Mar 20, 2003",
            assignedTo: "Quinn Rios",
            priority: "high",
            status: "Completed"
        },
        {
            id: 4,
            title: "john wick",
            description: "Models are the essence of Sequelize. A model is an abstraction that represents a table in your database. In Sequelize, it is a class that extends Model.",
            dueDate: "Mar 20, 2003",
            assignedTo: "Quinn Rios",
            priority: "medium",
            status: "Completed"
        },
        {
            id: 5,
            title: "Megan Sweet4",
            description: "fdsfgfgfgh",
            dueDate: "Jun 6, 2026",
            assignedTo: "Sydney Mann",
            priority: "medium",
            status: "In Progress"
        },

        {
            id: 6,
            title: "Jelani Banks",
            description: "Cillum illo omnis co",
            dueDate: "Aug 31, 2026",
            assignedTo: "Quinn Rios",
            priority: "low",
            status: "Pending"
        },
        {
            id: 7,
            title: "Ramji Sanmugam",
            description: "A watch is a timepiece carried or worn by a person. It is designed to maintain a consistent movement despite the motions caused by the person's activities",
            dueDate: "Mar 20, 2003",
            assignedTo: "Quinn Rios",
            priority: "high",
            status: "Completed"
        },
        {
            id: 8,
            title: "john wick",
            description: "The model tells Sequelize several things about the entity it represents, such as the name of the table in the database and which columns it has (and their data types).",
            dueDate: "Mar 20, 2003",
            assignedTo: "Quinn Rios",
            priority: "medium",
            status: "Completed"
        },
        {
            id: 9,
            title: "john wick",
            description: "Modern watches often display the day, date month, and year. Mechanical watches may have extra features such as moon-phase displays and different types of tourbillon.",
            dueDate: "Mar 20, 2003",
            assignedTo: "Quinn Rios",
            priority: "medium",
            status: "Completed"
        },
        {
            id: 10,
            title: "john wick",
            description: "A pocket watch is carried in a pocket, often attached to a chain. A stopwatch is a type of watch that measures intervals of time.",
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
                {filterTasks.map(task => (<TaskCard key={task.id} task={task} />))}
            </div>

        </section>
    )
}

export default Tasks