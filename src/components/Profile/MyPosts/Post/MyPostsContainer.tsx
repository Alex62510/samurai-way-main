import React from "react";
import MyPosts from "../MyPosts";
import {addPostActionCreater, updateNewPostTextCreater} from "../../../../redux/profile-reducer";
import {StateType} from "../../../../redux/store";
import {connect} from "react-redux";

export type MyPostsPropsType = {
    store:any
}
// const MyPostsContainer = (props: MyPostsPropsType) => {
//     const addPost = () => {
//         props.store.dispatch(addPostActionCreater())
//     }
//     const onPostChange = (text: string) => {
//         let action = text && updateNewPostTextCreater(text)
//         props.store.dispatch(action)
//     }
//     return (
//         <MyPosts
//             updateNewPostText={onPostChange}
//             addPost={addPost}
//             posts={props.store.getState().profilePage.posts}
//             newPostText={props.store.getState().profilePage.newPostText}
//         />
//     )
// }
let MapStateToProps=(state:StateType)=>{
   return{
       posts:state.profilePage.posts,
       newPostText:state.profilePage.newPostText
   }
}
let MapDispatchToProps=(dispatch: (action: any) => void)=>{
    return{
        updateNewPostText:(text:string)=>{dispatch(text && updateNewPostTextCreater(text))},
        addPost:()=>{dispatch(addPostActionCreater())}
    }
}
const SuperMyPostContainer=connect(MapStateToProps,MapDispatchToProps)(MyPosts)



export default SuperMyPostContainer;