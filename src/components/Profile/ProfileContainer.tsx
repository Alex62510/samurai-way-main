import React from "react";
import s from './Profile.module.css'
import Profile from "./Profile";
import {connect} from "react-redux";
import {GetStatusTC, ProfileGetTC, ProfileType, UpdateStatusTC} from "../../redux/profile-reducer";
import {AppStateType} from "../../redux/redux-store";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";


type PathParamsType = {
    userId: string
}
export type OwnPropsType = MapStateToPropsType & MapDispatchToPropsType
export type MapStateToPropsType = {
    profile: ProfileType | null
    status: string
    autorazedUserId: number | null
    isAuth: boolean
}

type MapDispatchToPropsType = {
    ProfileGetTC: (id: number) => any
    GetStatusTC: (id: number) => any
    UpdateStatusTC: (status: string) => any
}
type ProfileContainerPropsType = RouteComponentProps<PathParamsType> & OwnPropsType

class ProfileContainer extends React.Component<ProfileContainerPropsType> {
    componentDidMount() {
        let userId = Number(this.props.match.params.userId)
        if (!userId) {
            userId = Number(this.props.autorazedUserId)
            // 28839
        }
        this.props.ProfileGetTC(userId)
        this.props.GetStatusTC(userId)
    }

    render() {

        return (
            <div className={s.content}>
                <Profile
                    {...this.props}
                    profile={this.props.profile}
                    status={this.props.status}
                    updateStatus={this.props.UpdateStatusTC}
                />
            </div>
        )
    }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        autorazedUserId: state.auth.id,
        isAuth: state.auth.isAuth
    }
}
export default compose<React.ComponentType>(
    connect(mapStateToProps, {ProfileGetTC, GetStatusTC, UpdateStatusTC}),
    WithAuthRedirect,
    withRouter)(ProfileContainer)

