import {
    GET_MANAGER,
    MANAGER_LOADING_LOADING,
    GET_MANAGERS,
    ADD_MANAGER,
    DELETE_MANAGER,
    MANAGER_LOADING,
} from "../actions/types";

const initialState = {
    managers: [],
    manager: {},
    loading: true,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case MANAGER_LOADING:
            return {
                ...state,
                loading: true,
            };
        case GET_MANAGERS:
            return {
                ...state,
                managers: action.payload,
                loading: false,
            };
        case GET_MANAGER:
            return {
                ...state,
                manager: action.payload,
                loading: false,
            };
        case ADD_MANAGER:
            return {
                ...state,
                managers: [action.payload, ...state.managers],
            };
        case DELETE_MANAGER:
            return {
                ...state,
                managers: state.managers.filter(
                    (manager) => manager._id !== action.payload
                ),
            };
        default:
            return state;
    }
}
