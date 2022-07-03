import axios from "axios"
import { getToken } from "./utils"

export default function searchUsers(cookie, searchKey){
return axios.get('search/users?category='+searchKey,{
        headers:{
            authorization: getToken(cookie)
        }
    })
}

export function searchPosts(cookie, searchKey){
    return axios.get('search/posts?category='+searchKey,{
            headers:{
                authorization: getToken(cookie)
            }
        })
}

export function searchTags(cookie, searchKey){
    return axios.get('search/tags?category='+searchKey,{
            headers:{
                authorization: getToken(cookie)
            }
        })
}
  