import React, {FC} from 'react';
import {useSelector} from "react-redux";

import Preloader from "../common/Preloader/Preloader";
import {getIsFetching} from "../../redux/users-selectors";
import {Users} from "./Users";

type PropsType = {
    pageTitle: string
}
const UsersPage: FC<PropsType> = ({pageTitle}) => {

    const isFetching = useSelector(getIsFetching)

    return <>
        <h2>{pageTitle}</h2>
        {isFetching ? <Preloader/> : null}
        <Users/>
    </>
}

export default UsersPage