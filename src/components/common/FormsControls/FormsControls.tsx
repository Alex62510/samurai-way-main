import React from "react";
import style from './FormsControls.module.css'

type TextAreaPropsType = {
    input: any
    meta: any
}
export const TextArea: React.FC<TextAreaPropsType> = ({input, meta, ...props}) => {
const showError=meta.touched && meta.error
    return (
        <div className={style.formControl + " " + (showError ? style.error: "")}>
            <div>
                <textarea {...input} {...props}/>
            </div>
            <div>
                {showError && <span>{meta.error}</span>}
            </div>

        </div>
    )
}
export const Input: React.FC<TextAreaPropsType> = ({input, meta, ...props}) => {
    const showError=meta.touched && meta.error
    return (
        <div className={style.formControl + " " + (showError ? style.error: "")}>
            <div>
                <input {...input} {...props}/>
            </div>
            <div>
                {showError && <span>{meta.error}</span>}
            </div>

        </div>
    )
}