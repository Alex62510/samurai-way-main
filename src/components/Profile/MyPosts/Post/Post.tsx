import React from "react";
import s from './Post.module.css'

type PostPropsType={
    message:string
    likesCount:string
}

const Post = (props:PostPropsType) => {
    return (
        <div className={s.item}>
            <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShwIXO7TuAocUZF1Jq5mJuRs78wGsf3Qe5-w&usqp=CAU"/>
            {props.message}

            <div>
                <span>likes</span>{props.likesCount}
            </div>
        </div>
    )
}

export default Post;