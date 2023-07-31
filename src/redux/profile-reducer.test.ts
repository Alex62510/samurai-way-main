import profileReducer, {addPostActionCreater} from "./profile-reducer";


test('new post should be added', ()=>{
    const action=addPostActionCreater('It-kamas')
    let state = {
        posts: [
            {id: 1, message: 'Hi how are you?', likesCount: "12"},
            {id: 2, message: "It's my first post", likesCount: "44"},
        ],
        profile: null,
        status: ""
    }



    const newState= profileReducer(state, action)
    expect(newState.posts.length).toBe(3)
})
