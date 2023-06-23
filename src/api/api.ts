import axios from "axios";
import {PhotosType} from "../redux/profile-reducer";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers:
        {'API-KEY': 'aa9190f9-bbc9-4ecd-87a2-1860f96fde78'},
    withCredentials: true
})

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 5) {
        return instance
            .get(`users?page=${currentPage}&count=${pageSize}`)
            .then(res => {
                //debugger
                return res.data
            })
    },
    unFollow(userId: number) {
        return instance
            .delete(`follow/${userId}`)
            .then(res => {
                return res.data
            })
    },
    follow(userId: number) {
        return instance
            .post(`follow/${userId}`)
            .then(res => {
                return res.data
            })
    },
    getProfile(userId: number) {
        console.warn('Obsolete method. Please use profileAPI object.')
        return profileAPI.getProfile(userId)
    }
}

export const profileAPI = {
    getProfile(userId: number) {
        return instance
            .get(`profile/${userId}`)
    },
    getStatus(userId: number) {
        return instance
            .get(`profile/status/${userId}`)
    },
    updateStatus(newStatus: string) {
        return instance
            .put(`profile/status`, {status: newStatus})
    },
    savePhoto(photoFile: File) {
        let formData=new FormData()
        formData.append('image',photoFile)
        return instance
            .put<{data: { photos: PhotosType }, resultCode: number, messages:string[]}>(`profile/photo`, formData, {headers:{
                'Content-Type':'multipart/form-data'
                }})
    },
}


export const authMeAPI = {
    getAuth() {
        return instance.get(`auth/me`)
            .then(response => {
                return response.data
            })
    },
    login(email: string, password: string, rememberMe: boolean = false) {
        return instance.post(`auth/login`, {email, password, rememberMe})
            .then(response => {
                return response.data
            })
    },
    logout() {
        return instance.delete(`auth/login`)
            .then(response => {
                return response.data
            })
    },
}



