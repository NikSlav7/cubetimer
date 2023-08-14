import "../css/CubepicSide.css"
import CubepicPiece from "./CubepicPiece";
function CubepicSide(props){

    function concatArray(){
        let arr = [];
        for (var i = 0; i < props.side.length; i++){
            arr = arr.concat(props.side[i]);
        }
        console.log(arr);
        return arr;
    }

    return (
        <div className="cubepic-side-container">
            {concatArray().map((el) => <CubepicPiece piece={el}/>)}
        </div>
    )
}
export default CubepicSide;