function todayDate() {
    return new Date().toISOString().split("T")[0]
}

function currentTime() {
    return new Date().toTimeString().slice(0, 5)
}

function NumLettersRegEx(value) {
    const allowed = /^[a-zA-Z0-9\s]+$/
    return allowed.test(value)
}

// name validation
function nameRegEx(name) {
    const acceptwords = /^[a-zA-Z\s]+$/
    return acceptwords.test(name)
}

// email validation
function emailRegEx(mail) {
    const value = mail.trim()

    if (value.length > 250) return "length"

    const parts = value.split("@")
    if (parts.length !== 2) return false

    const [local, domain] = parts

    if (!local || !domain) return false
    if (local.length > 64) return "localLength"
    if (domain.length > 200) return "domainLength"
    if (value.includes("..")) return false
    if (!domain.includes(".")) return false

    const emailFormat = /^[a-zA-Z0-9][a-zA-Z0-9._%+-]*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+$/
    return emailFormat.test(value)
}

// URL validation
function urlRegEx(prourl) {
    const urlFormat = /^(https?:\/\/|www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z0-9]+)+([\/?#].*)?$/
    return urlFormat.test(prourl)
}

export function validateForm(data) {

    const errors = {}

    // task name
    if (!data.taskName.trim()) {
        errors.taskName = "Task Name is required."
    }
    else if (data.taskName.trim().length < 3) {
        errors.taskName = "Task Name must contain minimum 3 characters."
    }
    else if (!NumLettersRegEx(data.taskName.trim())) {
        errors.taskName = "Only letters, numbers and spaces are allowed."
    }
    else if (data.taskName.trim().length > 50) {
        errors.taskName = "Task Name cannot exceed 50 characters."
    }

    // assignee name
    if (!data.assigneeName.trim()) {
        errors.assigneeName = "Assignee Name is required."
    }
    else if (!nameRegEx(data.assigneeName.trim())) {
        errors.assigneeName = "Numbers and special characters are not allowed."
    }
    else if (data.assigneeName.trim().length < 3) {
        errors.assigneeName = "Assignee Name must contain minimum 3 letters."
    }

    // email
    const result = emailRegEx(data.assigneeEmail.trim())

    if (!data.assigneeEmail.trim()) {
        errors.assigneeEmail = "Email is required."
    }
    else if (result === "length") {
        errors.assigneeEmail = "Email must not exceed 250 characters."
    }
    else if (result === "localLength") {
        errors.assigneeEmail = "Email local part must not exceed 64 characters."
    }
    else if (result === "domainLength") {
        errors.assigneeEmail = "Email domain is too long."
    }
    else if (!result) {
        errors.assigneeEmail = "Enter valid Email."
    }

    // date
    if (!data.dueDate) {
        errors.dueDate = "Due date is required."
    }
    else if (data.dueDate < todayDate()) {
        errors.dueDate = "Past dates are not allowed."
    }

    // time
    if (!data.dueTime) {
        errors.dueTime = "Due time is required."
    }
    else if (data.dueDate === todayDate() && data.dueTime < currentTime()) {
        errors.dueTime = "Past time is not allowed."
    }

    // priority
    if (!data.priority) {
        errors.priority = "Select priority level."
    }

    // hours
    if (!String(data.hours).trim()) {
        errors.hours = "Enter estimated hours."
    }
    else if (!Number.isInteger(Number(data.hours))) {
        errors.hours = "Hours must be a whole number."
    }
    else if (Number(data.hours) < 1 || Number(data.hours) > 8000) {
        errors.hours = "Hours must be between 1 and 8000."
    }

    // URL
    if (!data.url.trim()) {
        errors.url = "Project URL is required."
    }
    else if (!urlRegEx(data.url.trim())) {
        errors.url = "Enter valid URL."
    }

    // description
    if (!data.description.trim()) {
        errors.description = "Task description is required."
    }
    else if (!NumLettersRegEx(data.description.trim())) {
        errors.description = "Only letters, numbers and spaces are allowed."
    }
    else if (data.description.trim().length < 150) {
        errors.description = "Description must be atleast 150 characters."
    }
    else if (data.description.trim().length > 500) {
        errors.description = "Description cannot exceed 500 characters."
    }

    // task type
    if (data.taskType.length === 0) {
        errors.taskType = "Select at least one task type."
    }

    // status
    if (!data.statusType) {
        errors.statusType = "Select task status."
    }

    // progress validation
    if (data.statusType === "completed" && Number(data.progress) !== 100) {
        errors.progress = "Completed tasks must have 100% progress."
    }
    else if (data.statusType === "pending" && Number(data.progress) !== 0) {
        errors.progress = "Pending tasks must have 0% progress."
    }
    else if (data.statusType === "inprogress" && Number(data.progress) === 100) {
        errors.progress = "In Progress tasks cannot have 100% progress."
    }

    return errors
}

// backEnd Error handler reuse for createTask, updateTask

export function handleTaskError(error, setErrors, formRef) {
    if (error.message === "Task already exists") {
        const firstError = "taskName"
        setErrors({ taskName: "Task already exists" })

        requestAnimationFrame(() => {
            const input = formRef.current?.querySelector(`[name="${firstError}"]`)

            if (input) {
                input.focus()
                input.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                })
            }
        })
        return true
    }
    return false
}