import React, {ChangeEvent, MouseEvent} from "react";
import s from './MyPosts.module.css'
import Post from "./Post/Post";
import {NewPostTextType, PostsType} from "../../../redux/store";
import {addPostActionCreater, updateNewPostTextCreater} from "../../../redux/profile-reducer";


export type MyPostsPropsType = {
    posts: PostsType
    dispatch: any
    newPostText: NewPostTextType
}
const MyPosts = (props: MyPostsPropsType) => {
    let postMessageRef = React.createRef<HTMLTextAreaElement>()
    const addPost = () => {
        props.dispatch(addPostActionCreater())
    }
    const onPostChange = () => {
        let text = postMessageRef.current && postMessageRef.current.value
        props.dispatch(updateNewPostTextCreater(text))
    }


    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea onChange={onPostChange} ref={postMessageRef} value={props.newPostText}/>
                </div>
                <div>
                    <button onClick={addPost}>Add post
                    </button>
                </div>
            </div>
            <div className={s.posts}>
                {props.posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>)}
            </div>
        </div>
    )
}

export default MyPosts;