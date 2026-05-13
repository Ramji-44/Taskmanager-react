
function CustomInput({id, label, type="text", placeholder, value, onChange , labelR, name, min,max,step}){

    return(
        <>
        <label htmlFor={id}>{label}</label>
        <input type={type} value={value} onChange={onChange}  placeholder={placeholder} id={id} name={name} min={min} max={max} step={step}/>
        <label htmlFor={id}>{labelR}</label>
        </>
    )
}
export default CustomInput