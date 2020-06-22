import {ADD_EXPENSE, CLEAR_EXPENSES} from "../ActionTypes/ActionTypes";

const store = {
    expenses: [],
}

export function reducer(state = store, action) {
    switch (action.type) {
        case ADD_EXPENSE:
            return {
                expenses: action.payload
            }
        case CLEAR_EXPENSES:
            return {
                expenses: action.payload
            }
        default:
            return state
    }
}