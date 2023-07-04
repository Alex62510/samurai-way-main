import React from "react";
import MyPosts from "../MyPosts";
import {addPostActionCreater, PostType} from "../../../../redux/profile-reducer";
import {connect} from "react-redux";
import {AppStateType} from "../../../../redux/redux-store";
import {Dispatch} from "redux";

type MapStateToPropsType = {
    posts: Array<PostType>
    // newPostText: string
}
let MapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        posts: state.profilePage.posts,
        // newPostText: state.profilePage.newPostText
    }
}
let MapDispatchToProps = (dispatch: Dispatch) => {
    return {
        addPost: (newPost:string) => {
            dispatch(addPostActionCreater(newPost))
        }
    }
}
const SuperMyPostContainer = connect(MapStateToProps, MapDispatchToProps)(MyPosts)

export default SuperMyPostContainer;