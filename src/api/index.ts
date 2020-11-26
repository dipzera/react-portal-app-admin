import { message } from "antd";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { API_APP_URL, API_AUTH_URL } from "../configs/AppConfig";
import {
    EMAIL_CONFIRM_MSG,
    EXPIRE_TIME,
    INTERNAL_ERROR,
} from "../constants/Messages";
import {
    authenticated,
    hideLoading,
    refreshToken,
    signOut,
} from "../redux/actions/Auth";
import store from "../redux/store";
const publicIp = require("react-public-ip");
declare module "axios" {
    interface AxiosResponse<T = any> extends Promise<T> {}
}
const REFRESH_TOKEN = (Token) => {
    return axios.get(`${API_AUTH_URL}/RefreshToken`, {
        params: { Token },
    });
};
class HttpClient {
    public readonly instance: AxiosInstance;
    public _token: string;

    public constructor(baseURL: string) {
        this.instance = axios.create({
            baseURL,
        });
        this._token = store.getState().auth.token;
        this._initializeResponseInterceptor();
        this._initializeRequestInterceptor();
    }

    public _initializeResponseInterceptor = () => {
        this.instance.interceptors.response.use(
            this._handleResponse,
            this._handleError
        );
    };
    public _initializeRequestInterceptor = () => {
        this.instance.interceptors.request.use((config) => {
            console.log(config);
            if (config.method === "get") {
                config.params = {
                    Token: this._token,
                    ...config.params,
                };
            }
            return config;
        });
    };

    private _RefreshToken = () =>
        this.instance.get(`${API_AUTH_URL}/RefreshToken`);

    public _handleResponse = async (response: AxiosResponse) => {
        console.log(response);
        if (response.data.ErrorCode === 118) {
            return this._handleError(response);
        }
        return response.data;
    };
    public _handleError = async (error: any) => {
        if (error.config && error.data && error.data.ErrorCode === 118) {
            return this._RefreshToken().then(async (data: any) => {
                const { ErrorCode, Token } = data;
                if (ErrorCode === 0) {
                    store.dispatch(authenticated(Token));
                    if (error.config.method === "get") {
                        error.config.params = {
                            Token,
                            ...JSON.parse(error.config.params),
                        };
                    }
                    if (error.config.method === "post") {
                        error.config.data = {
                            ...JSON.parse(error.config.data),
                            Token,
                        };
                    }
                    /* If it's a post request this doesn't seem to work correctly. */
                    return axios
                        .request(error.config)
                        .then((response) => response.data);
                } else if (ErrorCode === 105) {
                    const key = "updatable";
                    message
                        .loading({ content: EXPIRE_TIME, key })
                        .then(() => store.dispatch(signOut()));
                }
            });
        }
        store.dispatch(hideLoading());
        return Promise.reject(error);
    };
}
export class AuthApi extends HttpClient {
    public constructor() {
        super(`${API_AUTH_URL}`);
    }

    public Login = async (data) =>
        this.instance.post("/AuthorizeUser", {
            ...data,
            info: (await publicIp.v4()) || ("" as string),
        });

    public RefreshToken = () => this.instance.get("/RefreshToken");

    public SendActivationCode = (UserID?: number) =>
        this.instance.get("/SendActivationCode", {
            params: { UserID },
        });

    public ResetPassword = async (Email) =>
        this.instance.post("/ResetPassword", {
            Email,
            info: (await publicIp.v4()) || "",
        });

    public RegisterUser = (data) => this.instance.post("/RegisterUser", data);

    public GetManagedToken = (CompanyID) =>
        this.instance.get("/GetManagedToken", {
            params: { CompanyID },
        });

    public ChangePassword = (data) =>
        this.instance.post("/ChangePassword", data);

    public ActivateUser = (params) =>
        this.instance.get("/ActivateUser", {
            params /* Param is a token took from the browser url */,
        });
}

export class AdminApi extends HttpClient {
    public constructor() {
        super(`${API_APP_URL}`);
    }

    public GetAllUsers = () => this.instance.get("/GetAllUsersInfo");

    public GetCompanyList = () => this.instance.get("/GetCompanyList");

    public GetBasicCompanyList = () =>
        this.instance.get("/GetBasicCompaniesList");

    public ChangeCompanyStatus = (ID, Status) =>
        this.instance.get("/ChangeCompanyStatus", {
            params: {
                ID,
                Status,
            },
        });

    public ChangeUserStatus = (ID, Status) =>
        this.instance.get("/ChangeUserStatus", {
            params: {
                ID,
                Status,
            },
        });
    public UpdateUser = async (data) =>
        this.instance.post("/UpdateUser", {
            ...data,
            Token: this._token,
            info: await publicIp.v4(),
        });

    public RegisterClientCompany = async (data) =>
        this.instance.post("/RegisterClientCompany", {
            ...data,
            Token: this._token,
            info: (await publicIp.v4()) || "",
        });

    public UpdateCompany = async (data) =>
        this.instance.post("/UpdateCompany", {
            ...data,
            Token: this._token,
            info: (await publicIp.v4()) || "",
        });

    public GetProfileInfo = () => this.instance.get("/GetProfileInfo");

    public GetCompanyInfo = () => this.instance.get("/GetCompanyInfo");

    public GetMarketAppList = () => this.instance.get("/GetMarketAppList");

    public UpdateMarketApp = (App) =>
        this.instance.post("/UpdateMarketApp", {
            App,
            Token: this._token,
        });

    public CreateMarketAppPackage = (data, MarketAppID) =>
        this.instance.post("/CreateMarketAppPackage", {
            AppPackage: {
                ...data,
            },
            MarketAppID,
            Token: this._token,
        });

    public UpdateMarketAppPackage = (AppPackage) =>
        this.instance.post("/UpdateMarketAppPackage", {
            AppPackage,
            Token: this._token,
        });

    public DeleteMarketAppPackage = (ID) =>
        this.instance.post("/DeleteMarketAppPackage", {
            ID,
        });

    public ChangeMarketAppStatus = (ID, Status) =>
        this.instance.get("/ChangeMarketAppStatus", {
            params: { ID, Status },
        });
}
