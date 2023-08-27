import {ContactsType} from "../../../redux/profile-reducer";
import React, {FC} from "react";
import s from "./ProfileInfo.module.css";

type ContactProps = {
    contacts?: ContactsType

}
export const UserContacts: FC<ContactProps> = ({contacts}) => {
    const contactTitle = contacts && Object.entries(contacts)
    return <div>
        {contactTitle?.map((title, index) => <div key={index}>
            <div className={s.contact} >{`${title[0]}: ${title[1] ? title[1] :''}`}</div>
        </div>)}
    </div>
}