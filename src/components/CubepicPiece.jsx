import { useEffect, useRef } from "react";
import "../css/CubepicPiece.css"
function CubepicPiece(props){


    let pieceRef = useRef(null)

    let colorMap = {
        0: "orange",
        1: "green",
        2: "red",
        3: "blue",
        4: "white",
        5: "yellow"
    }

    

    return (
        <div ref={pieceRef} style={{"backgroundColor": colorMap[props.piece]}} className="cubepiece-container">
            
        </div>
    )
}
export default CubepicPiece;