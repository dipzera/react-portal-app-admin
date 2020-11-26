import { UPDATE_SETTINGS } from "../constants/Account";
import axios from "axios";
import { message } from "antd";
import { onLocaleChange } from "./Theme";
import { refreshToken, signOut } from "./Auth";
import { DONE, EXPIRE_TIME, LOADING } from "../../constants/Messages";
import { API_APP_URL } from "../../configs/AppConfig";
import { AdminApi } from "../../api";

export const updateSettings = (payload) => ({
    type: UPDATE_SETTINGS,
    payload,
});

export const getProfileInfo = () => {
    return async (dispatch) => {
        return new AdminApi().GetProfileInfo().then((data: any) => {
            const { ErrorCode, ErrroMessage, User } = data;
            if (ErrorCode === 0) {
                dispatch(updateSettings(data.User));
                if (User.UiLanguage === 0) {
                    dispatch(onLocaleChange("ro"));
                } else if (User.UiLanguage === 1) {
                    dispatch(onLocaleChange("ru"));
                } else {
                    dispatch(onLocaleChange("en"));
                }
            }
        });
    };
};
export const setProfileInfo = (accountInfo) => {
    return async (dispatch) => {
        return new AdminApi().UpdateUser(accountInfo).then((data: any) => {
            if (data.ErrorCode === 0) {
                dispatch(getProfileInfo());
                message.success({ content: DONE, key: "updatable" });
            } else {
                message.error({ content: data.ErrorMessage, key: "updatable" });
            }
        });
    };
};
