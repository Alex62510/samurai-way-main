import axios from "axios";


export const instanse = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'Api-KEY': "411e8394-b71d-41ea-b481-7ce537fa101e"
    }
})


export const userApi = {
    getUsers(currentPage: number, pageSize: number, term: string = '', friend: null | boolean = null) {
        return instanse.get(`users?page=${currentPage}&count=${pageSize}&term=${term}`+ (friend===null?'': `&friend=${friend}`))
            .then(res => {
                return res.data
            })
    },
    followUsers(id: number) {
        return instanse.delete(`follow/${id}`)
    },
    unfollowUsers(id: number) {
        return instanse.post(`follow/${id}`, {})
    },
}
export const profileApi = {
    getProfile(userId: number) {
        return instanse.get(`profile/` + userId)
    },
    getStatus(userId: number) {
        return instanse.get(`profile/status/` + userId)
    },
    updateStatus(status: string) {
        return instanse.put(`profile/status/`, {status})
    },
    savePhoto(photoFile: any) {
        const formData = new FormData()
        formData.append("image", photoFile)
        return instanse.put(`profile/photo/`, formData, {headers: {'Content-Type': 'multipart/form-data'}})
    },
    saveProfile(profile: any) {

        return instanse.put(`profile`, profile)
    }
}

export enum ResultCode {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10
}

type MeResponseType = {
    data: { id: number, email: string, login: string },
    resultCode: ResultCode,
    messages: string[]
}
type LoginResponseType = {
    data: { userId: number },
    resultCode: number,
    messages: string[]
}
export const authApi = {
    me() {
        return instanse.get<MeResponseType>(`auth/me`).then(res => res.data)
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instanse.post<LoginResponseType>(`auth/login`, {
            email,
            password,
            rememberMe,
            captcha
        }).then(res => res.data)
    },
    logout() {
        return instanse.delete(`auth/login`,)
    },
}
export const securityApi = {
    getCaptchaUrl() {
        return instanse.get(`security/get-captcha-url`)
    }
}

