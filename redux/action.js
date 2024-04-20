import { ADD_USER } from "./constants"

export const addUser = (user) =>{
return {
    type: ADD_USER,
    payload: JSON.stringify(user)
}
}