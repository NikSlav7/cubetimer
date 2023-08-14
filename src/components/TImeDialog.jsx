import { useEffect, useRef, useState } from "react";
import "../css/TimeDialog.css"
import PenaltyFormater from "./PenaltyFormater";
function TimeDialog(props){


    const noRef = useRef(null);
    const twoRef = useRef(null);
    const dnfRef = useRef(null);

    const [currentPen, setCurrentPen] = useState(null);

    const refMap = {
        "no":noRef,
        "+2": twoRef,
        "dnf": dnfRef
    }
    useEffect(()=>{
        setChosen();
        addPenalyEventListeners()

        return () =>{
            removePenaltyEventListeners()
        }
    },[])

    function penaltyClickEventListener(e){
        setCurrentPen(e.target.dataset.mapKey)

    }
    function addPenalyEventListeners(){
        document.querySelectorAll(".time-dialog-penalty").forEach((el)=>{
            el.addEventListener("click", penaltyClickEventListener)
        })
    }

    function removePenaltyEventListeners(){
        document.querySelectorAll(".time-dialog-penalty").forEach((el)=>{
            el.removeEventListener("click", penaltyClickEventListener)
        })
    }

    function setChosen(){
        let pen = props.details['penalty'];
        refMap[pen].current.classList.add("time-dialog-chosen-penalty")
        setCurrentPen(refMap[pen].current.dataset.mapKey)
    }

    function formatTime(time, pen){
        
        return new PenaltyFormater().formatTime(time, pen);
    }

    function onSaveClick(){
        props.editPen(props.details['index'], currentPen)
        props.editDialog(false)
    }


    return (
    <div className="time-dialog-background" onClick={()=>props.editDialog(false)}>
        <div className="time-dialog-container" onClick={(e)=>e.stopPropagation()}>
            <div className="time-dialog-scramble-container">
                <p className="time-dialog-scramble">{props.details['scramble']}</p>
            </div>
            <div className="time-dialog-time-container">
                <p className="time-dialog-time">{formatTime(props.details['time'], currentPen === null ? props.details['penalty'] : currentPen)}</p>
            </div>
            <div className="time-dialog-buttons-container"> 
                 <div className="time-dialog-penalties-container">
                    <p ref={noRef} data-map-key="no" className={currentPen==='no' ? "time-dialog-penalty time-dialog-chosen-penalty" : "time-dialog-penalty"}>No</p>
                    <p ref={twoRef} data-map-key="+2" className={currentPen==='+2' ? "time-dialog-penalty time-dialog-chosen-penalty" : "time-dialog-penalty"}>+2</p>
                    <p ref={dnfRef} data-map-key="dnf" className={currentPen==='dnf' ? "time-dialog-penalty time-dialog-chosen-penalty" : "time-dialog-penalty"}>DNF</p>
                 </div>
                 <div className="time-dialog-other-buttons-container">
                    <button className="time-dialog-save-button" onClick={()=>onSaveClick()}>Save</button>
                    <button className="time-dialog-cancel-button" onClick={()=> props.editDialog(false)}>Cancel</button>
                 </div>
            </div>
        </div>
    </div>)
}
export default TimeDialog;