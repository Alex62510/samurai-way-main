import React from 'react';
import {Redirect} from "react-router-dom";

export const WithAuthRedirect = (Component:any) => {
    class RedirectComponent extends React.Component<any, any>{
        render() {
            if (!this.props.isAuth) return <Redirect to={'/Login'}/>
            return <Component {...this.props}/>
        }
    }
    return RedirectComponent
};

export default WithAuthRedirect;