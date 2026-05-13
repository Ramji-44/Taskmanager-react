import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import icons from "../../utils/Fontawesome"

const Error = "name is required"

function Validation(){

    return(
        <>
        <span><FontAwesomeIcon icon={icons.warning} className="warning"/><small>{Error}</small></span>
        </>
    )
}

export default Validation