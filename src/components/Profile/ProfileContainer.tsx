import React from "react";
import s from './Profile.module.css'
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {ProfileGetTC, ProfileType, setUserProfile} from "../../redux/profile-reducer";
import {AppStateType} from "../../redux/redux-store";
import {Redirect, withRouter} from "react-router-dom";
import {userApi} from "../../api/api";

export type MapProfilePropsType = MapStateToPropsType & MapDispatchToPropsType
export type MapStateToPropsType = {
    profile: ProfileType | null
    isAuth:boolean
}
type MapDispatchToPropsType = {
    ProfileGetTC: (id:number) => any
}
class ProfileContainer extends React.Component<any> {
    componentDidMount() {
        let userId = this.props.match.params.userId
        if(!userId) {
            userId = 28839}
        this.props.ProfileGetTC(userId)
    }
    render() {
        if (!this.props.isAuth) return <Redirect to={'/Login'}/>
        return (
            <div className={s.content}>
                <Profile {...this.props} profile={this.props.profile} />
            </div>
        )
    }
}
const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        profile: state.profilePage.profile,
        isAuth:state.auth.isAuth
    }
}
const WithUrlDataContainerComponent = withRouter(ProfileContainer)
export default connect(mapStateToProps, {ProfileGetTC})(WithUrlDataContainerComponent)
