import { useEffect } from 'react';
import '../css/Times.css'
import PenaltyFormater from './PenaltyFormater';
function Times(props){

    useEffect(()=>{
        console.log(props.timeList)
    })

    function formatTime(time, penalty){
        let formater = new PenaltyFormater();
        return formater.formatTime(time, penalty)
    }
    return (
        <div className="times-container">
            {props.timeList.map((el, ind) => <p onClick={()=>props.editDialog(true, ind)} className='times-time' >{formatTime(el['time'], el['penalty'])}</p>)}            
        </div>
    )

}
export default Times;