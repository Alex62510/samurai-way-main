import React from "react";
import s from './MyPosts.module.css'
import Post from "./Post/Post";
import {PostType} from "../../../redux/profile-reducer";
import {Field, Form, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {TextArea} from "../../common/FormsControls/FormsControls";



export type MyPostsPropsType = {
    posts: Array<PostType>
    // updateNewPostText:(text:string)=>void
    addPost:(newPost:string)=>void
    // newPostText: string

}
const maxLength10=maxLengthCreator(20)
const MyPosts = (props: MyPostsPropsType) => {
    let postMessageRef = React.createRef<HTMLTextAreaElement>()
    const onAddPost = (value:string| any) => {
        props.addPost(value.newPostText)
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <AddNewPostsReduxForm onSubmit={onAddPost}/>
            <div className={s.posts}>
                {props.posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>)}
            </div>
        </div>
    )
}

const AddNewPostsForm=(props:any)=>{
    return(
        <Form onSubmit={props.handleSubmit}>
            <div>
                <Field name="newPostText" component={TextArea} validate={[required,maxLength10]} placeholder="post massage"/>
            </div>
            <div>
                <button >Add post</button>
            </div>
        </Form>
    )
}
const  AddNewPostsReduxForm=reduxForm({form:"ProfileAddNewPostsForm"})(AddNewPostsForm)
export default MyPosts;