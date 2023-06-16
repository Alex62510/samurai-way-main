import React from "react";
import s from './Profile.module.css'
import Profile from "./Profile";
import {connect} from "react-redux";
import {ProfileGetTC, ProfileType} from "../../redux/profile-reducer";
import {AppStateType} from "../../redux/redux-store";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";


type PathParamsType = {
    userId: string
}
export type OwnPropsType = MapStateToPropsType & MapDispatchToPropsType
export type MapStateToPropsType = {
    profile: ProfileType | null
    // isAuth: boolean
}

type MapDispatchToPropsType = {
    ProfileGetTC: (id: number) => any
}
type ProfileContainerPropsType = RouteComponentProps<PathParamsType> & OwnPropsType

class ProfileContainer extends React.Component<ProfileContainerPropsType> {
    componentDidMount() {
        let userId = Number(this.props.match.params.userId)
        if (!userId) {
            userId = 28839
        }
        this.props.ProfileGetTC(userId)
    }

    render() {

        return (
            <div className={s.content}>
                <Profile {...this.props} profile={this.props.profile}/>
            </div>
        )
    }
}



// AuthRedirectComponent=connect(mapStateToPropsForRedirect)(AuthRedirectComponent)

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        profile: state.profilePage.profile,
        // isAuth: state.auth.isAuth
    }
}
const WithUrlDataContainerComponent = withRouter(ProfileContainer)
export default WithAuthRedirect(connect(mapStateToProps, {ProfileGetTC})(WithUrlDataContainerComponent))
