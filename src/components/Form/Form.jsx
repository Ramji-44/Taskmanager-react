import CustomInput from "./CustomInput"
import { useState } from "react"

function Form() {

    const [formData, setFormData] = useState({
        taskName: "",
        AssigneeName: "",
        AssigneeEmail: "",
        DueDate: "",
        DueTime: "",
        Hours: "",
        Url: "",
        Progress: "",
        TaskType: "",
        StatusType: ""
    })

    const [range, setRange] = useState(0)   // for input range

    return (
        <form action="" className="taskform">
            <CustomInput
                id="Tname"
                type="text"
                placeholder="Task Name *"
                value={formData.taskName}
                onChange={(e) => setFormData({ ...formData, taskName: e.target.value })}
            />

            <CustomInput id="Aname" type="text" placeholder="Assignee Name *" value={formData.AssigneeName} onChange={(e) => setFormData({ ...formData, AssigneeName: e.target.value })} />
            <CustomInput id="Aemail" type="email" placeholder="Assignee Email *" value={formData.AssigneeEmail} onChange={(e) => setFormData({ ...formData, AssigneeEmail: e.target.value })} />
            <CustomInput id="date" label="Due Date *" type="date" value={formData.DueDate} onChange={(e) => setFormData({ ...formData, DueDate: e.target.value })} />
            <CustomInput id="time" label="Due Time *" type="time" value={formData.DueTime} onChange={(e) => setFormData({ ...formData, DueTime: e.target.value })} />

            <CustomInput id="hour" label="Estimated Hours *" type="number" value={formData.Hours} onChange={(e) => setFormData({ ...formData, Hours: e.target.value })} />
            <CustomInput id="link" type="url" placeholder="Project URL" value={formData.Url} onChange={(e) => setFormData({ ...formData, Url: e.target.value })} />

            <textarea name="Task description" cols="30" rows="3" placeholder="Task Description"></textarea>

            <CustomInput id="progress" label="Task Progress *" type="range" min="0" max="100" step="1" value={range} onChange={(e) => ({ ...formData, Progress: setRange(e.target.value) })} />
            <p>{range}%</p>

            <p>Task Type *</p>
            <CustomInput id="bug" labelR="Bug Fix" type="checkbox" value={formData.TaskType} onChange={(e) => ({ ...formData, TaskType: e.target.value })} />
            <CustomInput id="feature" labelR="Feature" type="checkbox" placeholder="" value={formData.TaskType} onChange={(e) => ({ ...formData, TaskType: e.target.value })} />
            <CustomInput id="enhance" labelR="Enhancement" type="checkbox" placeholder="" value={formData.TaskType} onChange={(e) => ({ ...formData, TaskType: e.target.value })} />

            <p>Status *</p>
            <CustomInput id="pending" labelR="Pending" type="radio" name="radio1" placeholder="" value={formData.StatusType} onChange={(e) => ({ ...formData, StatusType: e.target.value })} />
            <CustomInput id="inprogress" labelR="In Progress" type="radio" name="radio1" placeholder="" value={formData.StatusType} onChange={(e) => ({ ...formData, StatusType: e.target.value })} />
            <CustomInput id="completed" labelR="Completed" type="radio" name="radio1" placeholder="" value={formData.StatusType} onChange={(e) => ({ ...formData, StatusType: e.target.value })} />

        </form>
    )
}
export default Form