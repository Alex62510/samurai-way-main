const ADD_POST = "ADD-POST"
const UPDADED_NEW_POST_TEXT = "UPDADED_NEW_POST_TEXT"

export const addPostActionCreater = () => ({type: ADD_POST})
export const updateNewPostTextCreater = (text: any) => ({type: UPDADED_NEW_POST_TEXT, newText: text})


let initialState={
        posts: [
            {id: 1, message: 'Hi how are you?', likesCount: "12"},
            {id: 2, message: "It's my first post", likesCount: "44"},
        ],
        newPostText: "It kamasytra.com"
    }

 const profileReducer=(state=initialState,action:any)=>{
     switch (action.type) {
         case ADD_POST:
             const newPost = {id: 4, message: state.newPostText, likesCount: "5"}
             state.posts.push(newPost)
             state.newPostText = ""
             break;
         case UPDADED_NEW_POST_TEXT:
             state.newPostText = action.newText
             break;
     }
     return state
}
export default profileReducer