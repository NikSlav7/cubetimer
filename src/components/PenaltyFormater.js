
class PenaltyFormater{
    
    constructor(){

    }


    formatTime(time, penalty){
        if (penalty === 'no') return time;
        else if (penalty === 'dnf') return "DNF";
        else {
            let num = parseFloat(time);
            num+=2;
            return "+" + num;
        }
    }
}
export default PenaltyFormater;