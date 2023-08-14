import '../css/CubeStat.css'
function CubeStat(props){
    
    return (
        <div className='cube-stat-container'>
            <div className='cube-stat-name-container'>
                <p className='cube-stat-name'>{props.name}</p>
            </div>
            <div className='cube-stat-value-container'>
                <p className='cube-stat-value'>{props.value}</p>
            </div>
        </div>
    )
}
 
export default CubeStat;