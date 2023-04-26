import React from "react";
import s from './MyPosts.module.css'
import Post from "./Post/Post";
import {NewPostTextType, PostsType} from "../../../redux/store";



export type MyPostsPropsType = {
    posts: PostsType
    updateNewPostText:(text:string)=>void
    addPost:()=>void
    newPostText: NewPostTextType

}
const MyPosts = (props: MyPostsPropsType) => {
    let postMessageRef = React.createRef<HTMLTextAreaElement>()
    const onAddPost = () => {
        props.addPost()
    }
    const onPostChange = () => {
        let text = postMessageRef.current && postMessageRef.current.value
        text && props.updateNewPostText(text)
    }
    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea onChange={onPostChange} ref={postMessageRef} value={props.newPostText}/>
                </div>
                <div>
                    <button onClick={onAddPost}>Add post
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