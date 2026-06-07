import styles from "./Form.module.css"
import { useState, useCallback, useEffect } from "react"
import CustomInput from "./CustomInput.jsx"
import CustomButton from "../Buttons/CustomButton"
import buttonStyles from "../Buttons/Button.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClipboardList, faCheck, faXmark } from "@fortawesome/free-solid-svg-icons"
import Validate from "./CustomValidation.jsx"
import validateForm from "../../utils/validation.js"
import { createTask, updateTask } from "../../services/service.js"

const initialData = {
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

function Form({ mode = "create", selectedTaskData, refreshTasks, setMode, clearEdit, setToast }) {
    const [data, setData] = useState(selectedTaskData || initialData)

    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (mode === "edit" && selectedTaskData?.id) {
            setData(selectedTaskData)
            setErrors({})
        }
    }, [selectedTaskData, mode])


    function handleChange(e) {
        const { name, value, type, checked } = e.target
        setData((prev) => {
            if (type === "checkbox") {
                const updatedTaskType = checked ? [...prev.taskType, value] : prev.taskType.filter((item) => item !== value)

                return { ...prev, taskType: updatedTaskType }
            }
            // other inputs
            return { ...prev, [name]: value }
        })
    }

    function handleSubmit(e) {
        e.preventDefault()

        const validationErrors = validateForm(data)

        if (Object.keys(validationErrors).length > 0) {
            const firstError = Object.keys(validationErrors)[0]

            setErrors({ [firstError]: validationErrors[firstError] })

            document.querySelector(`[name="${firstError}"]`)?.focus()
            return
        }

        const taskAction = mode === "edit" ? updateTask(data) : createTask(data)
            taskAction.then((result) => {
                handleReset()
                refreshTasks()

                setToast({ visible: true, message: mode === "edit" ? "Task Updated Successfully" : "Task Created Successfully", type: mode === "edit" ? "update" : "success" })
            })
            .catch((error) => {
                if(error.message === "Task already exists"){   // backend error
                    setErrors({
                        taskName: "Task already exists"
                    })
                    document.querySelector('[name="taskName"]')?.focus()
                    return
                }
            })
    }

    function handleReset() {
        setErrors({})
        setData(initialData)
        if (mode === "edit") {
            clearEdit()
        }
    }

    return (
        <form className={styles.taskform} onSubmit={handleSubmit} noValidate>

            <h3 className={styles.formTitle}>
                <FontAwesomeIcon icon={faClipboardList} className={styles.titleIcon} />
                {mode === "edit" ? " Edit Task" : "Create New Task"}
            </h3>

            <div className={styles.box}>
                <CustomInput
                    id="taskName"
                    name="taskName"
                    placeholder="Task Name *"
                    value={data.taskName}
                    onChange={handleChange}
                />

                <div className={styles.errorMessage}>
                    {errors.taskName && <Validate message={errors.taskName} />}
                </div>
            </div>

            <div className={styles.box}>
                <CustomInput
                    id="assigneeName" name="assigneeName" placeholder="Assignee Name *" value={data.assigneeName} onChange={handleChange} />
                <div className={styles.errorMessage}>
                    {errors.assigneeName && <Validate message={errors.assigneeName} />}
                </div>
            </div>

            <div className={styles.box}>
                <CustomInput id="assigneeEmail" name="assigneeEmail" type="email" placeholder="Assignee Email *" value={data.assigneeEmail} onChange={handleChange} />
                <div className={styles.errorMessage}>
                    {errors.assigneeEmail && <Validate message={errors.assigneeEmail} />}
                </div>
            </div>


            <div className={styles.inputBox}>
                <CustomInput id="dueDate" name="dueDate" type="date" label="Due Date*" value={data.dueDate} onChange={handleChange} min={new Date().toISOString().split("T")[0]} />
                <div className={styles.errorMessage}>
                    {errors.dueDate && <Validate message={errors.dueDate} />}
                </div>
            </div>

            <div className={styles.inputBox}>
                <CustomInput id="dueTime" name="dueTime" type="time" label="Due Time*" value={data.dueTime} onChange={handleChange} />
                <div className={styles.errorMessage}>
                    {errors.dueTime && <Validate message={errors.dueTime} />}
                </div>
            </div>

            <div className={styles.inputBox}>
                <label className={styles.floatLabel}>Priority Level*</label>
                <select name="priority" value={data.priority} onChange={handleChange} >
                    <option value="" disabled>Select Priority</option>
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                </select>

                <div className={styles.errorMessage}>
                    {errors.priority && <Validate message={errors.priority} />}
                </div>
            </div>

            <div className={styles.inputBox}>
                <CustomInput id="hours" name="hours" type="number" label="Estimated Hours*" value={data.hours} onChange={handleChange} />
                <div className={styles.errorMessage}>
                    {errors.hours && <Validate message={errors.hours} />}
                </div>
            </div>

            <div className={styles.box}>
                <CustomInput
                    id="url" name="url" type="url" placeholder="Project URL*" value={data.url} onChange={handleChange} />
                <div className={styles.errorMessage}>
                    {errors.url && <Validate message={errors.url} />}
                </div>
            </div>

            <div className={styles.box}>
                <textarea name="description" placeholder="Task Description *" value={data.description} onChange={handleChange} maxLength={200} />
                <div className={styles.errorMessage}>
                    {errors.description && <Validate message={errors.description} />}
                </div>
            </div>

            <div className={styles.box}>
                <div className={styles.inputRange}>
                    <span>Task Progress*</span>

                    <CustomInput id="progress" name="progress" type="range" min="0" max="100" step="1" value={data.progress} onChange={handleChange} />
                    <p>{data.progress}%</p>
                    <div className={styles.errorMessage}>
                        {errors.progress && <Validate message={errors.progress} />}
                    </div>
                </div>
            </div>


            <div className={styles.box}>
                <div className={styles.taskTypes}>
                    <p>Task Type*</p>

                    <CustomInput id="bug" type="checkbox" name="taskType" value="BugFix" checked={data.taskType.includes("BugFix")} onChange={handleChange} endLabel="Bug Fix" />

                    <CustomInput id="feature" type="checkbox" name="taskType" value="Feature" checked={data.taskType.includes("Feature")} onChange={handleChange} endLabel="Feature" />

                    <CustomInput id="enhancement" type="checkbox" name="taskType" value="Enhancement" checked={data.taskType.includes("Enhancement")} onChange={handleChange} endLabel="Enhancement" />
                </div>

                <div className={styles.errorMessage}>
                    {errors.taskType && <Validate message={errors.taskType} />}
                </div>
            </div>

            <div className={styles.box}>
                <div className={styles.statusTypes}>
                    <p>Status*</p>
                    <CustomInput id="pending" type="radio" name="statusType" value="pending" checked={data.statusType === "pending"} onChange={handleChange} endLabel="Pending" />

                    <CustomInput id="inprogress" type="radio" name="statusType" value="inprogress" checked={data.statusType === "inprogress"} onChange={handleChange} endLabel="In Progress" />

                    <CustomInput id="completed" type="radio" name="statusType" value="completed" checked={data.statusType === "completed"} onChange={handleChange} endLabel="Completed" />
                </div>

                <div className={styles.errorMessage}>
                    {errors.statusType && <Validate message={errors.statusType} />}
                </div>
            </div>

            <div className={buttonStyles.taskButtons}>
                <CustomButton
                    text={mode === "edit" ? "Update Task" : "Create Task"}
                    type="submit"
                    className={mode === "edit" ? "updateBtn" : "createBtn"}
                    icon={faCheck}
                />

                <CustomButton
                    text={mode === "edit" ? "Cancel" : "Reset"}
                    type="button"
                    className={mode === "edit" ? "cancelBtn" : "resetBtn"}
                    icon={faXmark}
                    onClick={handleReset}
                />
            </div>

        </form >
    )
}

export default Form