import React from 'react';
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {DialogsType, MessagesType} from "../../redux/message-reducer";
import {Field, reduxForm} from "redux-form";
import {TextArea} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";

export type DialogsPropsType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
    newMassageBody: string
    updateNewMessageBody: (body: string) => void
    sendMessage: (value:string) => void
    isAuth: boolean
}
const Dialogs = (props: DialogsPropsType) => {
    const dialogsElement = props.dialogs.map(d => < DialogItem name={d.name} id={d.id} key={d.id}/>)
    const messagesElement = props.messages.map(m => <Message messageElement={m.message} key={m.id}/>)

    const addNewMessage=( values:string|any)=>{
        props.sendMessage(values.newMassageBody)
    }
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElement}
            </div>
            <div className={s.messages}>
                <div>{messagesElement}</div>
                <AddMessageFormRedux
                    onSubmit={addNewMessage}
                />
            </div>
        </div>
    );
};
type AddMessageFormType={handleSubmit:React.FormEventHandler<HTMLFormElement> | undefined}

const maxLength50=maxLengthCreator(50)
const AddMassageForm = (props:AddMessageFormType ) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={TextArea} name="newMassageBody" validate={[required,maxLength50]} placeholder="Enter your massage"/>
               </div>
            <div>
                <button >send</button>
            </div>
        </form>
    )
}
const AddMessageFormRedux=reduxForm({form:"dialogAddMassageForm"})(AddMassageForm)
export default Dialogs;