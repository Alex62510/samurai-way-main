import React from 'react';

export type ProfileStatusPropsType = {
    status: string

}

class ProfileStatus extends React.Component<any, any> {
    state = {
        editMode: false
    }
activateEditMode= ()=>{
    this.setState({
        editMode: true
    })
}
    deactivateEditMode =()=> {
        this.setState({
            editMode:false
        })
}
    render() {
        return (
            <div>
                {this.state.editMode
                    ? <div>
                        <input value={this.props.status} onBlur={this.deactivateEditMode} autoFocus={true}/>
                    </div>
                    : <div>
                        <span onDoubleClick={this.activateEditMode}>{this.props.status}</span>
                    </div>}
            </div>

        )
    }


}

export default ProfileStatus
