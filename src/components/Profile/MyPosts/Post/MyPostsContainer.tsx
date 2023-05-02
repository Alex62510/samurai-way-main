import React from "react";
import MyPosts from "../MyPosts";
import {addPostActionCreater, updateNewPostTextCreater} from "../../../../redux/profile-reducer";
import {StateType} from "../../../../redux/store";
import {connect} from "react-redux";

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