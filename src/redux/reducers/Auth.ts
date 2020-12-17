import {
    AUTHENTICATED,
    SHOW_AUTH_MESSAGE,
    HIDE_AUTH_MESSAGE,
    SIGNOUT_SUCCESS,
    SIGNUP_SUCCESS,
    SHOW_LOADING,
    SIGNOUT,
    SIGNUP,
    SIGNIN_WITH_GOOGLE_AUTHENTICATED,
    SIGNIN_WITH_FACEBOOK_AUTHENTICATED,
    HIDE_LOADING,
    VALIDATE_USER,
    IS_USER_ACTIVATED,
    SET_TOKEN,
} from "../constants/Auth";
export interface IAuth {
    loading?: boolean;
    message?: string;
    showMessage?: boolean;
    redirect?: string;
    token?: string;
    isAuth?: boolean;
}

const initState = {
    loading: false,
    message: "",
    showMessage: false,
    redirect: "",
    token: "",
    isAuth: false,
};

const auth = (state = initState, action: any) => {
    switch (action.type) {
        case AUTHENTICATED:
            return {
                ...state,
                loading: false,
                redirect: "/",
                token: action.token,
                isAuth: true,
            };

        case SHOW_AUTH_MESSAGE:
            return {
                ...state,
                message: action.message,
                showMessage: true,
                loading: false,
            };
        case HIDE_AUTH_MESSAGE:
            return {
                ...state,
                message: "",
                showMessage: false,
            };
        case SIGNOUT:
            return {
                ...state,
                token: null,
                redirect: "/auth/login",
                loading: false,
                isAuth: false,
            };

        case SHOW_LOADING: {
            return {
                ...state,
                loading: true,
            };
        }
        case HIDE_LOADING:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
};

export default auth;
