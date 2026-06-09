import styles from "../Modals/Modal.module.css"
import CustomButton from "../Buttons/CustomButton"
import buttonStyles from "../Buttons/Button.module.css"
import CustomInput from "./CustomInput.jsx"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClipboardList, faCheck, faXmark } from "@fortawesome/free-solid-svg-icons"
import ValidateMsg from "./CustomValidation"
import { updateTask } from "../../services/service"
import { useTaskForm } from "../../Hooks/useTaskForm.jsx"
import { handleTaskError } from "../../utils/validation.js"

function EditForm({ task, refreshTasks, onClose, setToast }) {

    const { data, errors, setErrors, formRef, handleChange, validate } = useTaskForm(task)

    function handleSubmit(e) {
        e.preventDefault()

        if (validate()) return  // stop submit, if validate has errors

        updateTask(data)
            .then(() => {
                refreshTasks()
                setToast({ visible: true, message: "Task Updated Successfully", type: "update" })
                onClose()
            })
            .catch((error) => handleTaskError(error, setErrors, formRef)) // backend validation error (duplicate tasks)
    }

    return (
        <form ref={formRef} className={styles.editForm} onSubmit={handleSubmit} noValidate>

            <div className={styles.editHeader}>
                <span />
                <div className={styles.editHeaderTitle}> <FontAwesomeIcon icon={faClipboardList} className={styles.iconList} />
                    Edit Task
                </div>
                <button type="button" className={styles.closeBtn} onClick={onClose}> <FontAwesomeIcon icon={faXmark} /> </button>
            </div>

            <div className={styles.editBody}>

                <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Task Name <span>*</span></label>
                    <CustomInput name="taskName" type="text" value={data.taskName} onChange={handleChange} />
                    <div className={styles.fieldError}>  {errors.taskName && <ValidateMsg message={errors.taskName} />} </div>
                </div>

                <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Description <span>*</span></label>
                    <textarea name="description" value={data.description} onChange={handleChange} maxLength={500} />
                    <div className={styles.fieldError}>  {errors.description && <ValidateMsg message={errors.description} />} </div>
                </div>

                <div className={styles.fieldRow}>
                    <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>Assignee Name <span>*</span></label>
                        <CustomInput name="assigneeName" type="text" value={data.assigneeName} onChange={handleChange} />
                        <div className={styles.fieldError}> {errors.assigneeName && <ValidateMsg message={errors.assigneeName} />} </div>
                    </div>
                    <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>Assignee Email <span>*</span></label>
                        <CustomInput name="assigneeEmail" type="email" value={data.assigneeEmail} onChange={handleChange} />
                        <div className={styles.fieldError}> {errors.assigneeEmail && <ValidateMsg message={errors.assigneeEmail} />} </div>
                    </div>
                </div>

                <div className={styles.fieldRow}>
                    <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>Due Date <span>*</span></label>
                        <CustomInput name="dueDate" type="date" value={data.dueDate} onChange={handleChange}
                            min={new Date().toISOString().split("T")[0]} />
                        <div className={styles.fieldError}>  {errors.dueDate && <ValidateMsg message={errors.dueDate} />} </div>
                    </div>

                    <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>Due Time <span>*</span></label>
                        <CustomInput name="dueTime" type="time" value={data.dueTime} onChange={handleChange} />
                        <div className={styles.fieldError}> {errors.dueTime && <ValidateMsg message={errors.dueTime} />} </div>
                    </div>
                </div>

                <div className={styles.fieldRow}>
                    <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>Priority <span>*</span></label>
                        <select name="priority" value={data.priority} onChange={handleChange}>
                            <option value="" disabled>Select priority</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                        <div className={styles.fieldError}>  {errors.priority && <ValidateMsg message={errors.priority} />}  </div>
                    </div>

                    <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>Estimated Hours <span>*</span></label>
                        <CustomInput name="hours" type="number" value={data.hours} onChange={handleChange} />
                        <div className={styles.fieldError}>  {errors.hours && <ValidateMsg message={errors.hours} />} </div>
                    </div>
                </div>

                <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Project URL <span>*</span></label>
                    <CustomInput name="url" type="url" value={data.url} onChange={handleChange} />
                    <div className={styles.fieldError}> {errors.url && <ValidateMsg message={errors.url} />} </div>
                </div>

                <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}> Task Progress <span>*</span> </label>
                    <div className={styles.rangeRow}>
                        <CustomInput name="progress" type="range" min="0" max="100" step="1"
                            value={data.progress} onChange={handleChange} />
                        <span className={styles.rangeValue}>{data.progress}%</span>
                    </div>
                    <div className={styles.fieldError}> {errors.progress && <ValidateMsg message={errors.progress} />} </div>
                </div>

                <div className={styles.fieldRow}>
                    <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>
                            Task Type <span>*</span>
                        </label>

                        <div className={styles.checkGroup}>
                            <CustomInput id="edit-bug" type="checkbox" name="taskType" value="BugFix" checked={data.taskType.includes("BugFix")} onChange={handleChange} endLabel="Bug Fix" />

                            <CustomInput id="edit-feature" type="checkbox" name="taskType" value="Feature" checked={data.taskType.includes("Feature")} onChange={handleChange} endLabel="Feature" />

                            <CustomInput id="edit-enhancement" type="checkbox" name="taskType" value="Enhancement" checked={data.taskType.includes("Enhancement")} onChange={handleChange} endLabel="Enhancement" />
                        </div>

                        <div className={styles.fieldError}> {errors.taskType && <ValidateMsg message={errors.taskType} />}  </div>
                    </div>

                    <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>
                            Status <span>*</span>
                        </label>

                        <div className={styles.checkGroup}>
                            <CustomInput id="edit-pending" type="radio" name="statusType" value="pending" checked={data.statusType === "pending"} onChange={handleChange} endLabel="Pending" />

                            <CustomInput id="edit-inprogress" type="radio" name="statusType" value="inprogress" checked={data.statusType === "inprogress"} onChange={handleChange} endLabel="In Progress" />

                            <CustomInput id="edit-completed" type="radio" name="statusType" value="completed" checked={data.statusType === "completed"} onChange={handleChange} endLabel="Completed" />
                        </div>

                        <div className={styles.fieldError}> {errors.statusType && <ValidateMsg message={errors.statusType} />} </div>
                    </div>
                </div>

            </div>

            <div className={`${styles.editFooter} ${buttonStyles.editTaskButtons}`}>
                <CustomButton text="Update Task" type="submit" className="updateBtn" icon={faCheck} />
                <CustomButton text="Cancel" type="button" className="cancelBtn" icon={faXmark} onClick={onClose} />
            </div>

        </form>
    )
}

export default EditForm