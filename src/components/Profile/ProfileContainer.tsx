import React from "react";
import s from './Profile.module.css'
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    GetStatusTC,
    ProfileGetTC,
    ProfileType,
    savePhotoTC,
    saveProfileTC,
    UpdateStatusTC
} from "../../redux/profile-reducer";
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
    savePhotoTC:(file:any)=>any
    saveProfileTC:(value:any)=>any
}
type ProfileContainerPropsType = RouteComponentProps<PathParamsType> & OwnPropsType

class ProfileContainer extends React.Component<ProfileContainerPropsType> {
    refreshProfile(){
        let userId = Number(this.props.match.params.userId)
        if (!userId) {
            userId =Number(this.props.autorazedUserId)
            if(!userId){
                this.props.history.push("/login")
            }
        }
        this.props.ProfileGetTC(userId)
        this.props.GetStatusTC(userId)
    }
    componentDidMount() {
        this.refreshProfile()
    }
    componentDidUpdate(prevProps: Readonly<ProfileContainerPropsType>, prevState: Readonly<{}>, snapshot?: any) {
       if(this.props.match.params.userId!==prevProps.match.params.userId){
           this.refreshProfile()
       }
    }
    render() {

        return (
            <div className={s.content}>
                <Profile
                    {...this.props}
                    isOwner={!this.props.match.params.userId}
                    profile={this.props.profile}
                    status={this.props.status}
                    updateStatus={this.props.UpdateStatusTC}
                    savePhoto={this.props.savePhotoTC}
                    saveProfile={this.props.saveProfileTC}
                />
            </div>
        )
    }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {

    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        autorazedUserId: state.auth.userID,
        isAuth: state.auth.isAuth
    }
}
export default compose<React.ComponentType>(
    connect(mapStateToProps, {ProfileGetTC, GetStatusTC, UpdateStatusTC,savePhotoTC,saveProfileTC}),
    WithAuthRedirect,
    withRouter)(ProfileContainer)

