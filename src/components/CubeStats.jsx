import '../css/CubeStats.css'
import AverageCalculator from './AverageCalculator';
import CubeStat from './CubeStat';
function CubeStats(props){


    function calculateAvg(){
        let calculator = new AverageCalculator();
        return calculator.calculateAvg(props.times)
    }

    function calculateAvg5(){
        let calculator = new AverageCalculator();
        if (props.times.length < 5) return "";
        return calculator.calculateAvg(props.times, 5)
    }
    function calculateAvg12(){
        let calculator = new AverageCalculator();
        if (props.times.length < 12) return "";
        return calculator.calculateAvg(props.times, 12)
    }
    function calculateAvg50(){
        let calculator = new AverageCalculator();
        if (props.times.length < 50) return "";
        return calculator.calculateAvg(props.times, 50)
    }

    const avgVal = calculateAvg();
    const avg5Val = calculateAvg5();
    const avg12Val = calculateAvg12();
    const avg50Val = calculateAvg50();


    return (
        <div className='cube-stats-container'>
            <CubeStat name="Average:" value={avgVal}/>
            <CubeStat name="Average of 5:" value={avg5Val}/>
            <CubeStat name="Average of 12:" value={avg12Val}/>
            <CubeStat name="Average of 50:" value={avg50Val}/>

        </div>
    )

}
export default CubeStats;