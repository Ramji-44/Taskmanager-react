import { useState, useRef } from "react"
import { validateForm } from "../utils/validation"
import { emptyTask } from "../utils/helper"

export function useTaskForm(initialData) {

    const [data, setData] = useState(initialData)
    const [errors, setErrors] = useState({})
    const formRef = useRef(null)

    function handleChange(e) {
        const { name, value, type, checked } = e.target

        setData(prev => {
            if (type === "checkbox") {
                const updatedTaskType = checked ? [...prev.taskType, value] : prev.taskType.filter(item => item !== value)
                return { ...prev, taskType: updatedTaskType }
            }
            return { ...prev, [name]: value }  // other inputs.
        })
        setErrors(prev => ({ ...prev, [name]: "" }))  // clear error, when start typing
    }

    function validate() {
        const validationErrors = validateForm(data)
        const keys = Object.keys(validationErrors)

        if (keys.length > 0) {   // focus on first error field
            const firstError = keys[0]

            setErrors({ [firstError]: validationErrors[firstError] })

            focusErrorField(firstError)

            return { [firstError]: validationErrors[firstError] }
        }

        return null
    }

    function focusErrorField(fieldName) {
        requestAnimationFrame(() => {
            const input = formRef.current?.querySelector(`[name="${fieldName}"]`)
            if (input) {
                input.focus()
                input.scrollIntoView({ behavior: "smooth", block: "center" })
            }
        })
    }

    function handleReset() {
        setData({ ...emptyTask })
        setErrors({})
    }

    return { data, setData, errors, setErrors, formRef, handleChange, handleReset, validate }
}
