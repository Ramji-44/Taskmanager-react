// GET, POST, PUT, DELETE methods

const URL = "http://localhost:4000/tasks"

export function getTasks(){
    return fetch(URL)
        .then((res) => res.json())
}


export function createTask(data){
    return fetch(URL, {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(data)
    })
    .then((res) => res.json())
}


export function updateTask(task){
    return fetch(`${URL}/${task.id}`, {
        method : "PUT",
        headers : {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(task)
    })
    .then((res) => res.json())
}


export function removeTask(task){
    return fetch(`${URL}/${task.id}` , {
        method : "DELETE"
    })
    .then((res) => res.json())
}