import usersReducer, {followAC, InitialUsersStateType, unfollowAC} from "./users-reducer";
let state: InitialUsersStateType
    beforeEach(()=>{
        state= {
        users: [{
            id: 0,
            name: "Dima 0",
            followed: false,
            photos: {small: null, large: null},
            status: "status 0",
            uniqueUrlName: ""
        }, {
            id: 1,
            name: "Dima 1",
            followed: true,
            photos: {small: null, large: null},
            status: "status 1",
            uniqueUrlName: ""
        }, {
            id: 2,
            name: "Dima 2",
            followed: true,
            photos: {small: null, large: null},
            status: "status 2",
            uniqueUrlName: ""
        }, {
            id: 3,
            name: "Dima 3",
            followed: true,
            photos: {small: null, large: null},
            status: "status 3",
            uniqueUrlName: ""
        }],
        pageSize: 10,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followInProgress: [],
            filter: {term:''}
    }})

test("follow success", () => {

        const newState=usersReducer(state,followAC(1))

        expect(newState.users[0].followed).toBeFalsy()
        expect(newState.users[1].followed).toBeTruthy()
    }
)
test("unfollow success", () => {

        const newState=usersReducer(state,unfollowAC(3))

        expect(newState.users[2].followed).toBeTruthy()
        expect(newState.users[3].followed).toBeFalsy()
    }
)