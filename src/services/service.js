// GET, POST, PUT, DELETE methods

const URL = "http://localhost:4000/tasks"

async function apiCall(url, options = {}) {
    const response = await fetch(url, options)
    const result = await response.json()

    if (!response.ok) {
        throw new Error(result.error)
    }
    return result
}

export function getTasks() {
    return apiCall(URL)
}

export function createTask(data) {
    return apiCall(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
}

export function updateTask(task) {
    return apiCall(`${URL}/${task.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
    })
}

export function removeTask(task) {
    return apiCall(`${URL}/${task.id}`, {
        method: "DELETE"
    })
}