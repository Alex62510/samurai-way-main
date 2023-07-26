import React, {ChangeEvent, useState} from 'react';

export type ProfileStatusPropsType = {
    status: string
    updateStatus: (status: string) => any

}

const ProfileStatusWithHooks = (props: ProfileStatusPropsType) => {

const[editMode,setEditMode]=useState<boolean>(false)
const [status,setStatus]=useState<string>(props.status)
    const activateEditMode=()=>{
    setEditMode(true)
}
    const deactivateEditMode=()=>{
        setEditMode(false)
        props.updateStatus(status)
    }
   const onStatusChange=(e:ChangeEvent<HTMLInputElement>)=>{
       setStatus(e.currentTarget.value)

   }

    return (
        <div>
            {editMode ?
                <div>
                    <input onChange={onStatusChange} value={status} autoFocus={true} onBlur={deactivateEditMode}/>
                </div>
                : <div>
                    <span onDoubleClick={activateEditMode}>{props.status || "-----"}</span>
                </div>}
        </div>
    )
}

export default ProfileStatusWithHooks
