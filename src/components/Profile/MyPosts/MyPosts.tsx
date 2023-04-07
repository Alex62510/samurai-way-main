import React, {ChangeEvent, MouseEvent} from "react";
import s from './MyPosts.module.css'
import Post from "./Post/Post";
import {NewPostTextType, PostsType, updatedNewPostText} from "../../../redux/state";
import {clear} from "@testing-library/user-event/dist/clear";


export type MyPostsPropsType = {
    posts: PostsType
    addPost: () => void
    newPostText: NewPostTextType
    updatedNewPostText: (NewPostText: string) => void
}
const MyPosts = (props: MyPostsPropsType) => {
    let postMessageRef = React.createRef<HTMLTextAreaElement>()
    const addPost = () => {
        props.addPost()
        props.updatedNewPostText("")
    }
    const onPostChange = () => {
        postMessageRef.current && props.updatedNewPostText(postMessageRef.current.value)
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