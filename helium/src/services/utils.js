export default function isLogin(cookies){
    if(cookies.get("user")){
        return true;
    } else return false;
}

export function getToken(cookies){
    if(isLogin(cookies))
        return cookies.get("user").token
    else return null
}