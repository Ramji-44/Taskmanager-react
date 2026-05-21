import styles from "./Form.module.css"

const CustomInput = (function CustomInput({ id, label, type = "text", placeholder, value, onChange, endLabel, name, min, max, step, checked }) {

    console.log(name, "......................................................rerendered")

    if (type === "checkbox" || type === "radio") {
        return (
            <label className={styles.checkRadioWrap} htmlFor={id}>
                <input type={type} value={value} onChange={onChange} id={id} name={name} checked={checked} />{endLabel}
            </label>
        )
    }

    return (
        <>
            {label && (<label className={styles.floatLabel} htmlFor={id}>{label}</label>)}
            <input type={type} value={value} onChange={onChange} placeholder={placeholder} id={id} name={name} min={min} max={max} step={step} />
        </>
    )
})

export default CustomInput