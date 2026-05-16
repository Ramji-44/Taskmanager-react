import styles from "./Form.module.css"
import { useState } from "react"
import CustomInput from "./CustomInput"
import CustomButton from "../Buttons/CustomButton"
import buttonStyles from "../Buttons/Button.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import icons from "../../utils/Fontawesome"
import Validate from "./Validation"

function Form({
    mode = "create",
    initialData
}) {

    console.log("Form Re-rendered")
    const [data, setData] = useState(

        initialData || {
            taskName: "",
            assigneeName: "",
            assigneeEmail: "",
            dueDate: "",
            dueTime: "",
            hours: "",
            url: "",
            description: "",
            progress: 0,
            priority: "",
            taskType: [],
            statusType: ""
        }
    )

    const [errors, setErrors] = useState({})

    function handleChange(e) {
        const { name, value, type, checked } = e.target

        if (type === "checkbox") {
            let updatedtaskType = [...data.taskType]

            if (checked) {
                updatedtaskType.push(value)
            }
            else {
                updatedtaskType =
                    updatedtaskType.filter(
                        (item) => item !== value
                    )
            }
            setData({
                ...data,
                taskType: updatedtaskType
            })
            return
        }
        // inputs
        setData({ ...data, [name]: value })
    }

    // submit
    function handleSubmit(e) {
        e.preventDefault()
        console.log(data)
        alert(mode === "edit" ? "Task Updated Successfully" : "Task Created Successfully")
    }

    function handleReset() {
        setData({
            taskName: "",
            assigneeName: "",
            assigneeEmail: "",
            dueDate: "",
            dueTime: "",
            hours: "",
            url: "",
            description: "",
            progress: 0,
            priority: "",
            taskType: [],
            statusType: ""
        })
        setErrors({})
    }

    return (
        <form className={styles.taskform} onSubmit={handleSubmit}>
            <h3 className={styles.formTitle}>
                <FontAwesomeIcon icon={icons.note} className={styles.titleIcon}/>
                {mode === "edit" ? " Edit Task" : "Create New Task"}
            </h3>

            <CustomInput
                id="taskName"
                name="taskName"
                placeholder="Task Name *"
                value={data.taskName}
                onChange={handleChange}
            />

            <div className={styles.errorMessage}>
                {errors.taskName && <Validate />}
            </div>


            <CustomInput id="assigneeName" name="assigneeName" placeholder="Assignee Name *" value={data.assigneeName} onChange={handleChange} />
            <div className={styles.errorMessage}>
                {errors.assigneeName && <Validate />}
            </div>

            <CustomInput id="assigneeEmail" name="assigneeEmail" type="email" placeholder="Assignee Email *" value={data.assigneeEmail} onChange={handleChange} />
            <div className={styles.errorMessage}>
                {errors.assigneeEmail && <Validate />}
            </div>

            <div className={styles.inputBox}>
                <CustomInput id="dueDate" name="dueDate" type="date" label="Due Date*" value={data.dueDate} onChange={handleChange} />
                <div className={styles.errorMessage}>
                    {errors.dueDate && <Validate />}
                </div>
            </div>

            <div className={styles.inputBox}>
                <CustomInput id="dueTime" name="dueTime" type="time" label="Due Time*" value={data.dueTime} onChange={handleChange} />
                <div className={styles.errorMessage}>
                    {errors.dueTime && <Validate />}
                </div>
            </div>

            <div className={styles.inputBox}>
                <label className={styles.floatLabel}>Priority Level*</label>
                <select name="Priority" value={data.priority} onChange={handleChange}>
                    <option value="">Select Priority</option>
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                </select>
                <div className={styles.errorMessage}>
                    {errors.priority && <Validate />}
                </div>
            </div>

            <div className={styles.inputBox}>
                <CustomInput id="hours" name="hours" type="number" label="Estimated Hours*" value={data.hours} onChange={handleChange} />
                <div className={styles.errorMessage}>
                    {errors.hours && <Validate />}
                </div>
            </div>

            <CustomInput id="url" name="url" type="url" placeholder="Project URL*" value={data.url} onChange={handleChange} />
            <div className={styles.errorMessage}>
                {errors.url && <Validate />}
            </div>

            <textarea name="description" placeholder="Task Description *" value={data.description} onChange={handleChange} />
            <div className={styles.errorMessage}>
                {errors.description && <Validate />}
            </div>

            <div className={styles.inputRange}>
                <span>Task Progress*</span>
                <CustomInput id="progress" name="progress" type="range" min="0" max="100" step="1" value={data.progress} onChange={handleChange} />
                <p>{data.progress}%</p>
            </div>
            <div className={styles.errorMessage}>
                {errors.progress && <Validate />}
            </div>

            <div className={styles.taskTypes}>
                <p>Task Type*</p>
                <CustomInput id="bug" type="checkbox" name="taskType" value="BugFix"
                    checked={data.taskType.includes("BugFix")}
                    onChange={handleChange}
                    endLabel="Bug Fix"
                />

                <CustomInput id="feature" type="checkbox" name="taskType" value="Feature"
                    checked={data.taskType.includes("Feature")}
                    onChange={handleChange}
                    endLabel="Feature"
                />

                <CustomInput id="enhancement" type="checkbox" name="taskType" value="Enhancement"
                    checked={data.taskType.includes("Enhancement")}
                    onChange={handleChange}
                    endLabel="Enhancement"
                />
                <div className={styles.errorMessage}>
                    {errors.taskType && <Validate />}
                </div>
            </div>

            <div className={styles.statusTypes}>
                <p>Status*</p>
                <CustomInput id="pending" type="radio" name="statusType" value="Pending"
                    checked={data.statusType === "Pending"}
                    onChange={handleChange}
                    endLabel="Pending"
                />

                <CustomInput id="inprogress" type="radio" name="statusType" value="In Progress"
                    checked={data.statusType === "In Progress"}
                    onChange={handleChange}
                    endLabel="In Progress"
                />

                <CustomInput id="completed" type="radio" name="statusType" value="Completed"
                    checked={data.statusType === "Completed"}
                    onChange={handleChange}
                    endLabel="Completed"
                />
                <div className={styles.errorMessage}>
                    {errors.statusType || <Validate />}
                </div>
            </div>

            {/* buttons  */}
            <div className={buttonStyles.taskButtons}>
                <CustomButton
                    text={mode === "edit" ? "Update Task" : "Create Task"}
                    type="submit"
                    className={mode === "edit" ? "updateBtn" : "createBtn"}
                    icon={icons.tick}
                />

                <CustomButton
                    text={mode === "edit" ? "Cancel" : "Reset"}
                    type="button"
                    className={mode === "edit" ? "cancelBtn" : "resetBtn"}
                    icon={icons.xmark} onClick={handleReset}
                />

            </div>
        </form>
    )
}
export default Form