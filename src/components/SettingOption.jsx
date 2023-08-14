import '../css/SettingOption.css'
function SettingOption(props){

    return (
        <div onClick={()=>props.click(props.title)} className={props.selected ? "setting-option setting-option-selected" : "setting-option"}>
            <p className='setting-option-title'>{props.title}</p>
        </div>
    )
}
export default SettingOption;