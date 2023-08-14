import "../css/MainPage.css"
import Cube from "./Cube";
import { useState, useEffect, useCallback, useRef } from "react";
import Timer from "./Timer";
import Times from "./Times";
import TimeDialog from "./TImeDialog";
import CubeStats from "./CubeStats";
import AverageCalculator from "./AverageCalculator";
import SettingsDialog from "./SettingsDialog";
function MainPage(){


    const [showSettingsDialog, setShowSettingsDialog] = useState(false)
    const [showTimeDialog, setShowTimeDialog] = useState(false)
    const [flag, setFlag] = useState(false)
    const [scrambleString, setScrambleString] = useState("");
    const [timeList, setTimeList] = useState([])
    const [userTimeEnterMode, setUserTimeEnterMode] = useState(false)
    const lastTime = useRef(0);
    const allowKey = useRef(true)
    const scrambleRef = useRef(null)
    

    const [settings, setSettings] = useState([
        {
            name: "Inspection",
            options: ['No', 'Yes'],
            selected: "No"
        }
    ])

    const [timeDialogDetails, setTimeDialogDetails] = useState({})


    useEffect(()=>{
        let cal = new AverageCalculator();
        cal.calculateAvg(timeList, 0)
    })

    useEffect(()=>{
        newScramble()
    }, [])

    function editAllowKeys(allow){
        console.log(allow)
        allowKey.current = allow;
    }

    const handleUserKeyPress = useCallback(event => {
       

        const { key, keyCode } = event;
            if (showTimeDialog){
                
            }
            else {
                if (keyCode === 13) {
                    newScramble()
                }

                if (keyCode === 46){
                    if (timeList.length === 0) return;
                    timeList.pop()
                    setTimeList([...timeList]);
            }
    }
    }, []);

    useEffect(()=>{
        console.log(showTimeDialog)
    },[showTimeDialog])


    
    function formatUnit(time){
        return (time < 10 ? "0" + time : time)
    }

    function formatMilis(milis){
        if (milis < 10) return "00" + milis;
        if (milis < 100) return "0" + milis;
        return milis;
    }

    function editPen(ind, pen){

        timeList[ind]['penalty'] = pen;
        setTimeList(timeList)
    }
   



    useEffect(() => {
        window.addEventListener("keydown", handleUserKeyPress);
        return () => {
            window.removeEventListener("keydown", handleUserKeyPress);
        };
    }, [handleUserKeyPress])

    function newScramble(){
        setScrambleString(generateScramble())
    }

    function addTime(time, scr, inspection){

        let el = {
            "time": time,
            "scramble": scrambleRef.current.innerText,
            "penalty": getPenalty(inspection)
        }
        console.log("penalty: " + getPenalty(inspection))

        timeList.push(el)
        setTimeList([...timeList]);

    }
    function getPenalty(time){
        if (time >= 0) return "no"
        else if (time < 0 && time >= -2) return "+2"
        else return "dnf"
    }
    function formatTimerTime(time){
        let mins = Math.floor(time / 1000 / 60);
        let secs = Math.floor((time - mins * 1000 * 60) / 1000);
        let milis = Math.floor(time - mins * 1000 * 60 - secs * 1000)
        console.log(milis)
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

    function generateScramble(){
        let length = getRandomArbitrary(28, 32);
        let chars = ['R', 'L', 'U', 'D', 'F', 'B']
        let turns = ['', "'", '2']
        let result = "";
        let lastChar = "";
        for (var i = 0; i < length; i++){
            let char  = chars[Math.floor(Math.random() * chars.length)]
            if (char === lastChar) {
                i--;
                continue;
            }
            if (i != 0) result += " ";
            result += char;
            lastChar = char
            result += turns[Math.floor(Math.random() * turns.length)]
        }
        console.log(result)
        return result;
    }
    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
      }

      function editDialog(show, ind){
        console.log(ind)
        setShowTimeDialog(show)
        if (show){
            editAllowKeys(false)
            let el = timeList[ind];
            el['index'] = ind;
            setTimeDialogDetails(el);
        }
        console.log(allowKey.current)
      }

    const allowKeys = useCallback(() => {
        console.log('allow' + !showTimeDialog)
        return  !showTimeDialog;
    }, [showTimeDialog])


    function changeSetting(ind, val){
        let copy = structuredClone(settings)
        console.log(ind + " " + val)
        copy[ind]['selected'] = val;
        setSettings(()=> {
            return copy;
        })
        setFlag(!flag)

    }

    function changeModeToOpposite(){
        console.log(userTimeEnterMode)
        setUserTimeEnterMode(userTimeEnterMode => !userTimeEnterMode)
    }

    const getTimerModeText = useCallback(()=>{
        if (userTimeEnterMode) return "Turn on Timer"
        else return "Enter Times manually"
    },[userTimeEnterMode])

    return (
        <div className="main-page-container">
            {showTimeDialog && timeDialogDetails !== {} && <TimeDialog editPen={editPen} details={timeDialogDetails} editDialog={editDialog} />}
            {showSettingsDialog && <SettingsDialog  editDialog={setShowSettingsDialog} changeSetting={changeSetting} settings={settings}/>}
            <div className="main-page-details-container">
                <div className="main-page-scramble-container">
                    <p ref={scrambleRef} className="main-page-scramble">{scrambleString}</p>
                </div>
                <div className="main-page-timer-container">
                    <Timer userEnter={userTimeEnterMode} settings={settings}  scrString={scrambleString} allowKeys={allowKey.current} add={addTime} scramble={newScramble}/>
                </div>  
                <div className="main-page-mode-change-container">
                    <p onClick={()=>changeModeToOpposite()} className="main-page-mode-change-text">{getTimerModeText()}</p>
                </div>
                <div className="main-page-ilustration-container">
                    {scrambleString !== '' && <Cube scrambleString={scrambleString} />}
                </div>
            </div>
            <div className="main-page-times-container">
                <Times editPen={editPen} editDialog={editDialog}  timeList={timeList}/> 
                <CubeStats times={timeList}/>
 
            </div>
            <button onClick={()=>setShowSettingsDialog(true)} className="main-page-settings-button">Settings</button>
        </div>
    )
}
export default MainPage;
