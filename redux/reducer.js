import { ADD_USER } from "./constants"

const initialState = null

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER:
            return action.payload
        default:
            return state
    }
}