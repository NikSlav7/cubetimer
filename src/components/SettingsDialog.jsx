import '../css/SettingsDialog.css'
import Setting from './Setting';
function SettingsDialog(props){

    return (
        <div className='settings-dialog-background' onClick={()=>props.editDialog(false)}>
            <div className='settings-dialog-container' onClick={(e)=>e.stopPropagation()}>
                {props.settings.map((el, ind)=> <Setting ind={ind} changeSetting={props.changeSetting} data={el}/>)}
            </div>
        </div>
    )
}
export default SettingsDialog;