import axios from "axios";
const instanse=axios.create({
   withCredentials: true,
   baseURL:'https://social-network.samuraijs.com/api/1.0/',
   headers:{
      'Api-KEY':"411e8394-b71d-41ea-b481-7ce537fa101e"
   }
})

export const userApi={
   getUsers(currentPage:number,pageSize:number){
      return  instanse.get(`users?page=${currentPage}&count=${pageSize}`)
          .then(res=>{
             return res.data})
   },
   followUsers(id:number){
      return  instanse.delete(`follow/${id}`)
   },
   unfollowUsers(id:number){
      return  instanse.post(`follow/${id}`,{})
   },
}
export const profileApi={
   getProfile(userId:number){
      return instanse.get(`profile/` + userId)
   },
   getStatus(userId:number){
      return instanse.get(`profile/status/` + userId)
   },
   updateStatus(status:string){
      return instanse.put(`profile/status/`, {status})
   }
}

export const authApi={
   authMe(){
      return instanse.get(`auth/me`)
   },
}


