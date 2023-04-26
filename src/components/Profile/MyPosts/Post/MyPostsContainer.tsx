import React from "react";
import MyPosts from "../MyPosts";
import {addPostActionCreater, updateNewPostTextCreater} from "../../../../redux/profile-reducer";

export type MyPostsPropsType = {
    store:any
}
const MyPostsContainer = (props: MyPostsPropsType) => {
    const addPost = () => {
        props.store.dispatch(addPostActionCreater())
    }
    const onPostChange = (text: string) => {
        let action = text && updateNewPostTextCreater(text)
        props.store.dispatch(action)
    }
    return (
        <MyPosts
            updateNewPostText={onPostChange}
            addPost={addPost}
            posts={props.store.getState().profilePage.posts}
            newPostText={props.store.getState().profilePage.newPostText}
        />
    )
}
export default MyPostsContainer;