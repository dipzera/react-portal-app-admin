export interface ApiResponse {
    ErrorCode: number;
    ErrorMessage: string;
}

/* Status handlers */
export interface IChangeCompanyStatusResponse extends ApiResponse {}

export interface IChangeMarketAppStatusResponse extends ApiResponse {}

export interface IChangeUserStatusResponse extends ApiResponse {}

/* Users */
export interface IUsers {
    Company: string;
    CompanyID: number;
    Email: string;
    FirstName: string;
    LastName: string;
    ID: number;
    LastAuthorize: string;
    LastAuthorizeIP: string;
    PhoneNumber: string;
    Photo: string;
    Status: number;
    UiLanguage: number;
}
export interface IGetAllUsersInfoResponse extends ApiResponse {
    Users: IUsers[];
}
export interface IUpdateUserResponse extends ApiResponse {}

/* Company */
export interface IGetBasicCompaniesListResponse extends ApiResponse {
    CompanyList: {
        ID: number;
        Logo?: string;
        Name: string;
        Status?: string;
    }[];
}
export interface ICompanyData {
    BIC: string;
    Bank: string;
    Email: string;
    CommercialName: string;
    CountryID: number;
    ID: number;
    IBAN: string;
    IDNO: string;
    IsVATPayer: boolean;
    JuridicalAddress: string;
    JuridicalName: string;
    Logo: string;
    OfficeAddress: string;
    PostalCode: string;
    ShortName: string;
    Status: number;
    VATCode: number;
    WebSite: string;
}
export interface IGetCompanyInfoResponse extends ApiResponse {
    Company: ICompanyData;
}

export interface IGetCompanyListResponse extends ApiResponse {
    CompanyList: ICompanyData[];
}

/* Apps */
export interface IPackages {
    ID: number;
    MaxValue: number;
    MinValue: number;
    Name: string;
    Price: number;
    SortIndex: number;
    Status: number;
    ValidFrom: string;
    ValidTo: string;
}
export interface IGetMarketAppListResponse extends ApiResponse {
    MarketAppList: {
        AppType: number;
        ApyKey: string;
        BackOfficeURI: string;
        ID: number;
        LicenseActivationCode: number;
        LicenseActivationCodeValidHours: number;
        LicenseActivationCodeValidTo: string;
        LongDescription: string;
        Name: string;
        Packages: IPackages[];
        Photo: string;
        ShortDescription: string;
        Status: number;
        TermsOfUse?: string;
    };
}
export interface IUpdateMarketAppResponse extends ApiResponse {}
export interface IUpdatePackageResponse extends ApiResponse {}

/* News */
export interface INewsList {
    Content: string;
    CreateDate?: any;
    Header: string;
    ID: number;
    Photo: string;
    ProductType: number;
    Status?: number;
}
export interface IGetNewsResponse extends ApiResponse {
    NewsList: INewsList[];
}
export interface IUpdateNewsResponse extends ApiResponse {}

/* Profile */
export interface IGetProfileInfoResponse extends ApiResponse {
    User: {
        Company?: string;
        CompanyID?: number;
        CreateDate?: string;
        Email: string;
        FirstName: string;
        ID: string;
        LastAuthorize?: string;
        LastAuthorizeIP?: string;
        LastName: string;
        PhoneNumber: string;
        Photo: string;
        Status: number;
        UiLanguage: number;
    };
}

/* Register/Update company */
export interface IRegisterClientCompanyResponse extends ApiResponse {
    CompanyID: number;
}

export interface IUpdateCompanyResponse extends ApiResponse {}

export interface IRefreshTokenResponse extends ApiResponse {
    Token: string;
}

export interface IAuthorizeUserResponse extends ApiResponse {
    Token: string;
}

export interface ISendActivationCodeResponse extends ApiResponse {}

export interface IResetPasswordResponse extends ApiResponse {}

export interface IRegisterUserResponse extends ApiResponse {}

export interface IGetManagedTokenResponse extends ApiResponse {
    Token: string;
}

export interface IChangePasswordResponse extends ApiResponse {}

export interface IActivateUserResponse extends ApiResponse {}

export interface IDeleteMarketAppPackageResponse extends ApiResponse {}