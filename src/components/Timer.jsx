import { clear } from "@testing-library/user-event/dist/clear";
import "../css/Timer.css"
import { useState, useCallback, useEffect, useRef, useDebugValue } from "react";
function Timer(props){


    const startedSolving = useRef(false);
    const [timerTime, setTimerTime] = useState(0)
    const [enterDigits, setEnterDigits] = useState([])
    const digitsRef = useRef([])
    const timerRef = useRef(null);
    const cubeStartTime = useRef(0)
    const intervalRef = useRef(null)
    const isInspecting = useRef(false)
    const lastInspectionTime = useRef(0)
    const userEnterMode = useRef(props.userEnter)
    const [flag, setFlag] = useState(false)


    useEffect(()=>{
        digitsRef.current=enterDigits
    }, [enterDigits])
    
    useEffect(()=>{
        console.log("user mode: " + props.userEnter)
        userEnterMode.current = props.userEnter
    },[props.userEnter])

    

    const handleUserKeyPress = useCallback(event => {
        const { key, keyCode } = event;
        console.log("MODE? " + userEnterMode.current)
        if (props.allowKeys){
            if (!userEnterMode.current && keyCode === 32) {
                console.log("tap")
                if (!startedSolving.current){
                    timerRef.current.classList.remove("timer-green")
                    console.log(props.settings[0]['selected'])
                    if (props.settings[0]['selected']==='No' || isInspecting.current) {
                        if (isInspecting.current) stopInspection()
                        isInspecting.current = false
                        startTimer()
                        startedSolving.current = !startedSolving.current

                    } 
                    else {
                        startInspection();
                        isInspecting.current = true;
                    }
                }
                else{
                    console.log("end")
                    stopTimer();
                    props.scramble();
                    startedSolving.current = !startedSolving.current

                }
            }
        }
        else {

        }
    }, [props.settings]);

    function startInspection(){
        setTimerTime(15)
        intervalRef.current = setInterval(()=>{
            setTimerTime((prevVal) =>{
                lastInspectionTime.current = prevVal - 1;
                return prevVal - 1;
            })
        },1000)
    }
    function stopInspection(){
        clearInterval(intervalRef.current)
    }


    function formatTime(time){
        let start = 0;
        for (var i = 0; i < 4; i++){
            if (time.charAt(i) !== "0" && i !== 2){
                return time.substring(i, time.length-1)
            } 
            else start++;
        }
        return time.substring(start, time.length-1)
    }

    function clearTimer(){
        setEnterDigits([])
    }


    function startTimer(){
        cubeStartTime.current = Date.now();
        intervalRef.current = setInterval(()=>{
            setTimerTime(Date.now() - cubeStartTime.current)
        }, 10)
    }
    function stopTimer(){
        let time = Date.now()
        clearInterval(intervalRef.current)
        let txt = timerRef.current.innerText;
        console.log(props.scrString)
        props.add(formatTime(txt), props.scrambleString, lastInspectionTime.current)
        lastInspectionTime.current = 0;
        intervalRef.current = null;
    }

    

    function formatTimerTime(time){
        if (isInspecting.current) return time;
        let mins = Math.floor(time / 1000 / 60);
        let secs = Math.floor((time - mins * 1000 * 60) / 1000);
        let milis = Math.floor(time - mins * 1000 * 60 - secs * 1000)
        return  formatUnit(mins) + ":" + formatUnit(secs) + "." + formatMilis(milis)
    }
    function formatUnit(time){
        return (time < 10 ? "0" + time : time)
    }

    function formatMilis(milis){
        if (milis < 10) return "00" + milis;
        if (milis < 100) return "0" + milis;
        return milis;
    }

    function onKeyDown(){
        timerRef.current.classList.add("timer-green")
    }
    

    const handleKeyDown = useCallback(event => {
        const { key, keyCode } = event;
        if (!userEnterMode.current && keyCode === 32) {
            console.log("key down")
            if (!startedSolving.current) {
                onKeyDown()
            }
            event.preventDefault()
        }
        else if(userEnterMode.current){
            if (keyCode > 95 && keyCode < 106){
                let val = keyCode - 96;
                console.log("Val: " + val )
                setEnterDigits(enterDigits => [...enterDigits, parseInt(val)])
            }
            if (keyCode === 8) setEnterDigits(enterDigits => enterDigits.slice(0, enterDigits.length - 1))
            if (keyCode === 13){
                if (digitsRef.current.length === 0) return
                let milis = timeToMilis(digitsRef.current)
                console.log(digitsRef.current)
                console.log("milis: " + milis)
                props.add(formatTime(formatTimerTime(milis)), props.scrambleString, 0)
                clearTimer()
            }
        }
    }, []);




    useEffect(() => {

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleUserKeyPress);
        return () => {
            window.removeEventListener("keyup", handleUserKeyPress);
            window.removeEventListener("keydown", handleKeyDown);

        };
    }, [handleUserKeyPress, props.settings])

    const getTimerTime = useCallback(() => {
        console.log("getting time")
        if (userEnterMode.current){
            return formatEnterTime(enterDigits)
        }
       else return formatTimerTime(timerTime)
    }, [enterDigits, timerTime])

    function formatEnterTime(arr){
        let milis = 0, secs= 0, mins = 0;
        for (let i = 0; i < arr.length; i++){
            let pos = arr.length - i - 1;
            if (pos > 3) mins = mins * 10 + arr[i];
            else if (pos <= 3 && pos > 1) secs = secs * 10 + arr[i]
            else milis = milis * 10 + arr[i];
        }
        console.log("mins: " + mins + "  seconds: " + secs + "  milis: "+ milis)
        return formatUnit(mins) + ":" + formatUnit(secs) + "." + formatUnit(milis)
    }


    function formatUnit(time){
        if (time === 0) return "00"
        else if (time < 10) return "0" + time;
        else return time;
    }

    function timeToMilis(arr){
        let time = 0;
        let multiplier = 1;
        console.log(arr)
        for (let i = arr.length-1; i >= 0; i--){
            if (arr.length - i - 1 === 4) multiplier *= 6;
            else multiplier *= 10;

            time += arr[i] * multiplier;
            console.log(arr[i] + " " + multiplier)
        }
        return time;
    }




    return (
        <div className="timer-container">
            <p ref={timerRef} className="timer-time">{getTimerTime()}</p>
        </div>
    )
}
export default Timer;