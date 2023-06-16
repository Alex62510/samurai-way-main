import React from "react";
import s from './Profile.module.css'
import Profile from "./Profile";
import {connect} from "react-redux";
import {ProfileGetTC, ProfileType, setUserProfile} from "../../redux/profile-reducer";
import {AppStateType} from "../../redux/redux-store";
import {Redirect, RouteComponentProps, withRouter} from "react-router-dom";
import WithAuthRedirect from "../../hoc/WithAuthRedirect";


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

        return (
            <div className={s.content}>
                <Profile {...this.props} profile={this.props.profile} />
            </div>
        )
    }
}

export const AuthRedirectComponent=WithAuthRedirect(ProfileContainer)
const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        profile: state.profilePage.profile,
        isAuth:state.auth.isAuth
    }
}
const WithUrlDataContainerComponent = withRouter(AuthRedirectComponent)
export default connect(mapStateToProps, {ProfileGetTC})(WithUrlDataContainerComponent)
