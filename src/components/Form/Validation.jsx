import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import icons from "../../utils/Fontawesome"

const Error = "name is required"

function Validation(){
    return(
        <span style={styles} ><FontAwesomeIcon icon={icons.warning}/><small>{Error}</small></span>      
    )
}

const styles={
    display : "flex",
    gap: "5px",
    alignItems : "center",
    fontSize: "14px",
    color : "red",
    padding: "0",
}


export default Validation