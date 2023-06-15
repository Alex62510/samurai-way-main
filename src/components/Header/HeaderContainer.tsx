import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {authMeTC} from "../../redux/auth-reducer";


class HeaderContainer extends React.Component<MapAuthType> {
    componentDidMount() {
        this.props.authMeTC()
    }
    render() {
        return <Header {...this.props} isAuth={this.props.isAuth} login={this.props.login}/>
    }
}
export type MapStateToProps = {
    isAuth: boolean,
    login: string
}
const mapStateToProps = (state: AppStateType): MapStateToProps=> {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}
export type MapDispatchToProps = {
    authMeTC:()=>any
}
export type MapAuthType=MapStateToProps & MapDispatchToProps
export default connect(mapStateToProps, {authMeTC})(HeaderContainer);