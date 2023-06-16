import React, {ComponentType} from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux-store";


export type MapStateToPropsTypeForRedirect = {
    isAuth: boolean
}
const mapStateToPropsForRedirect = (state: AppStateType): MapStateToPropsTypeForRedirect => {
    return {
        isAuth: state.auth.isAuth
    }
}
export function WithAuthRedirect <T>(Component: ComponentType<T>)  {
    const RedirectComponent = (props: MapStateToPropsTypeForRedirect) => {
        let{isAuth, ...restProps}=props
        if (!isAuth) return <Redirect to={'/Login'}/>
        return <Component {...restProps as T}/>
    }

    let ConnectedRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent)
    return ConnectedRedirectComponent
};

