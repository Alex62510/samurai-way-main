import React from "react";
import s from './Profile.module.css'

function Profile() {
    return(<div className={s.content}>
        <div>
            <img
                src={"https://wonder-day.com/wp-content/uploads/2020/04/wonder-day-images-rainbow-37-1024x576.jpg"}/>
        </div>
        <div>
            ava+description
        </div>
        <div>
            my posts
            <div>
                New post
            </div>
            <div className={s.posts}>
                <div className={s.item}>
                    post 1
                </div>
                <div className={s.item}>
                    post 2
                </div>
            </div>
        </div>
    </div>)

}
export default Profile;