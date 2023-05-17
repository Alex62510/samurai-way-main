import React from "react";
import s from './ProfileInfo.module.css'
import {Provider} from "react-redux";
import Preloader from "../../common/preloader/Preloader";
type ProfileInfoPropsType={
    profile:any
}
function ProfileInfo(props:ProfileInfoPropsType) {
    return (
        <div>
            {
                !props.profile ? <Preloader/>: <div>
                    <div>
                        <img
                            src={"https://wonder-day.com/wp-content/uploads/2020/04/wonder-day-images-rainbow-37-1024x576.jpg"}/>
                    </div>
                    <div className={s.descriptionBlock}>

                        <img src={props.profile.photos.large}/>
                        ava+description
                    </div>
                </div>  }
        </div>
    )
}

export default ProfileInfo;