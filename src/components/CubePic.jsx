import { useEffect } from 'react';
import '../css/CubePic.css'
import CubepicSide from './CubepicSide';
import EmptySide from './EmptySIde';
function CubePic(props){

    useEffect(()=>{
        console.log(props.cube)
    },[])

    function getHorizontalSides(){
        let copy = structuredClone(props.cube)
        copy.delete(4)
        copy.delete(5)
        return copy;
    }

    return (
        <div className="cubepic-container">
            <div className='cubepic'>
                <EmptySide />
                <CubepicSide side={props.cube.get(4)}/>
                <EmptySide />
                <EmptySide/>
                {Array.from(getHorizontalSides().values()).map((val) => <CubepicSide side={val}/>)}
                <EmptySide />
                <CubepicSide side={props.cube.get(5)}/>
                <EmptySide />
                <EmptySide/>
            </div>
        </div>
    )
}
export default CubePic;