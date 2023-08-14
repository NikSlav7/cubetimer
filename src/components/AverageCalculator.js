
class AverageCalculator{

    constructor(){

    }

     calculateAvg(list, size) {
        if (list.length === 0) return;
        if (size !== undefined){
            list = list.slice(list.length - size)
        }
        list = list.map((el) => this.timeToMilis(el['time']))
        list.sort(function(x,y){
            return x - y
        })
        let remove=this.getHowManyToRemove(list.length)
        let sum = 0;
        for (let i = remove; i < list.length - remove; i++){
            sum+=list[i]
        }

        console.log("avg" + size + ": " + sum )
        console.log(list)

        let avg = Math.round(sum / (list.length - remove * 2))
        return this.milisToTime(avg);
     }
    getHowManyToRemove(size){
        if (size < 3) return 0;
       return Math.floor(size / 20) + 1;
    }

    milisToTime(time){
        let mins = Math.floor(time / 1000 / 60);
        let secs = Math.floor((time - mins * 1000 * 60) / 1000);
        let milis = Math.floor(time - mins * 1000 * 60 - secs * 1000)
        console.log(milis)
        return  (mins === 0 ? "" : this.formatUnit(mins) + ":") + this.formatUnit(secs) + "." + this.formatMilis(milis)
    }
    formatUnit(time){
        return (time < 10 ? "0" + time : time)
    }

    formatMilis(milis){
        if (milis > 0 && milis < 100) return "0" + String(milis).slice(0, 1);
        else if (milis === 0) return "00"
        else return milis
    }

    timeToMilis(time){
        let split = time.split(":");
        let mins = 0, secs = 0, milis = 0;
        if (split.length === 2){
            mins = parseInt(split[0]);
            let minmilis = split[1].split(".");
            secs = parseInt(minmilis[0])
            milis = parseInt(minmilis[1])
        }
        else {
            let minmilis = time.split(".");
            secs = parseInt(minmilis[0])
            milis = parseInt(minmilis[1]) 
        }
        return (mins * 60*1000 + secs*1000+milis*10);
    }
    
}
export default AverageCalculator;