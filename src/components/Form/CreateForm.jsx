import styles from "./Form.module.css"
import CustomInput from "./CustomInput.jsx"
import CustomButton from "../Buttons/CustomButton.jsx"
import buttonStyles from "../Buttons/Button.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClipboardList, faCheck, faXmark, faCircleCheck } from "@fortawesome/free-solid-svg-icons"
import ValidateMsg from "./CustomValidation.jsx"
import { createTask } from "../../services/service.js"
import { useTaskForm } from "../../Hooks/useTaskForm.js"
import { handleTaskError } from "../../utils/validation.js"
import { emptyTask } from "../../utils/helper.js"


function CreateForm({ refreshTasks, setToast }) {

    const { data, errors, setErrors, formRef, handleChange, handleReset, validate } = useTaskForm(emptyTask)

    function handleSubmit(e) {
        e.preventDefault()

        if (validate()) return // validate function 

        const taskAction = createTask(data)   // POST request
        taskAction.then(() => {
            handleReset()
            refreshTasks()

            setToast({ visible: true, message: "Task Created Successfully", type: "success" })
        })
            .catch((error) => {
                handleTaskError(error, setErrors, formRef) // backend Error
            })
    }

    return (
        <form ref={formRef} className={styles.taskform} onSubmit={handleSubmit} noValidate>

            <div className={styles.taskHeader}>
                <h3 className={styles.formTitle}>
                    <FontAwesomeIcon icon={faClipboardList} className={styles.titleIcon} />
                    Create New Task
                </h3>

                <div className={styles.submitResetBtns}>
                    <abbr title="Submit"> <button type="submit"><FontAwesomeIcon icon={faCircleCheck} className={styles.tick} /></button></abbr>
                    <abbr title="Reset"><button type="button" onClick={handleReset}><FontAwesomeIcon icon={faXmark} className={styles.xmark} /></button></abbr>
                </div>
            </div>

            <div className={styles.box}>
                <CustomInput
                    id="taskName"
                    name="taskName"
                    placeholder="Task Name *"
                    value={data.taskName}
                    onChange={handleChange}
                />

                <div className={styles.errorMessage}>
                    {errors.taskName && <ValidateMsg message={errors.taskName} />}
                </div>
            </div>

            <div className={styles.box}>
                <CustomInput
                    id="assigneeName" name="assigneeName" placeholder="Assignee Name *" value={data.assigneeName} onChange={handleChange} />
                <div className={styles.errorMessage}>
                    {errors.assigneeName && <ValidateMsg message={errors.assigneeName} />}
                </div>
            </div>

            <div className={styles.box}>
                <CustomInput id="assigneeEmail" name="assigneeEmail" type="email" placeholder="Assignee Email *" value={data.assigneeEmail} onChange={handleChange} />
                <div className={styles.errorMessage}>
                    {errors.assigneeEmail && <ValidateMsg message={errors.assigneeEmail} />}
                </div>
            </div>

            <div className={styles.inputBox}>
                <CustomInput id="dueDate" name="dueDate" type="date" label="Due Date*" value={data.dueDate} onChange={handleChange} min={new Date().toISOString().split("T")[0]} />
                <div className={styles.errorMessage}>
                    {errors.dueDate && <ValidateMsg message={errors.dueDate} />}
                </div>
            </div>

            <div className={styles.inputBox}>
                <CustomInput id="dueTime" name="dueTime" type="time" label="Due Time*" value={data.dueTime} onChange={handleChange} />
                <div className={styles.errorMessage}>
                    {errors.dueTime && <ValidateMsg message={errors.dueTime} />}
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
                    {errors.priority && <ValidateMsg message={errors.priority} />}
                </div>
            </div>

            <div className={styles.inputBox}>
                <CustomInput id="hours" name="hours" type="number" label="Estimated Hours*" value={data.hours} onChange={handleChange} />
                <div className={styles.errorMessage}>
                    {errors.hours && <ValidateMsg message={errors.hours} />}
                </div>
            </div>

            <div className={styles.box}>
                <CustomInput
                    id="url" name="url" type="url" placeholder="Project URL*" value={data.url} onChange={handleChange} />
                <div className={styles.errorMessage}>
                    {errors.url && <ValidateMsg message={errors.url} />}
                </div>
            </div>

            <div className={styles.box}>
                <textarea name="description" placeholder="Task Description *" value={data.description} onChange={handleChange} maxLength={500} />
                <div className={styles.errorMessage}>
                    {errors.description && <ValidateMsg message={errors.description} />}
                </div>
            </div>

            <div className={styles.box}>
                <div className={styles.inputRange}>
                    <span>Task Progress*</span>

                    <CustomInput id="progress" name="progress" type="range" min="0" max="100" step="1" value={data.progress} onChange={handleChange} />
                    <p>{data.progress}%</p>
                    <div className={styles.errorMessage}>
                        {errors.progress && <ValidateMsg message={errors.progress} />}
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
                    {errors.taskType && <ValidateMsg message={errors.taskType} />}
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
                    {errors.statusType && <ValidateMsg message={errors.statusType} />}
                </div>
            </div>

            <div className={buttonStyles.taskButtons}>
                <CustomButton
                    text="Create Task"
                    type="submit"
                    className="createBtn"
                    icon={faCheck}
                />

                <CustomButton
                    text="Reset"
                    type="button"
                    className="resetBtn"
                    icon={faXmark}
                    onClick={handleReset}
                />
            </div>

        </form >
    )
}

export default CreateForm