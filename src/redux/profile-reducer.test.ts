import profileReducer, {addPostAC, deletePostAC} from "./profile-reducer";
let state = {
    posts: [
        {id: 1, message: 'Hi how are you?', likesCount: "12"},
        {id: 2, message: "It's my first post", likesCount: "44"},
    ],
    profile: null,
    status: ""
}

test('new post should be added', ()=>{
    const action=addPostAC('It-kamas')
    const newState= profileReducer(state, action)
    expect(newState.posts.length).toBe(3)

})
test('message of new post should be correct', ()=>{
    const action=addPostAC('It-kamas')
    const newState= profileReducer(state, action)

    expect(newState.posts[2].message).toBe('It-kamas')
})
test('length after delete should be decrement', ()=>{
    const action=deletePostAC(1)
    const newState= profileReducer(state, action)

    expect(newState.posts.length).toBe(1)
})
test('length after delete should be the same if incorrect id', ()=>{
    const action=deletePostAC(100)
    const newState= profileReducer(state, action)

    expect(newState.posts.length).toBe(2)
})