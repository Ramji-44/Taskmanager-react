// empty object for form
export const emptyTask =  {  
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

// reusable functions for taskCards and viewTaskModal
export function formatDate(dateString) {
    const date = new Date(dateString)

    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric"
    })
}

export function formatPriority(priority) {
    const priorityMap = {
        low: "Low",
        medium: "Medium",
        high: "High"
    }
    return priorityMap[priority] || priority
}

export function formatTaskType(taskTypes) {
    if (!Array.isArray(taskTypes)) return taskTypes
    return taskTypes.map(type => type.replace("BugFix", "Bug Fix")).join(", ")
}

export function formatStatus(status) {
    const statusMap = {
        pending: "Pending",
        inprogress: "In Progress",
        completed: "Completed"
    }
    return statusMap[status] || status
}