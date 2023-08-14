import "../css/Setting.css"
import SettingOption from "./SettingOption";
function Setting(props){


    function onOptionClick(val){
        console.log(props.ind);
        props.changeSetting(props.ind, val)
    }

    return (
        <div className="setting-container">
            <div className="setting-name-container">
                <p className="setting-name">{props.data['name']}</p>
            </div>
            <div className="setting-options-container">
                {props.data['options'].map((option) => <SettingOption click={onOptionClick} title={option} selected={option === props.data['selected']}/>)}
            </div>
        </div>
    )
}
export default Setting;