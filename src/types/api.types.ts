import { ICustomerFromResponse, ICustomerResponse } from "./customer.types";

export interface IRequestOptions {
    baseURL?: string;
    url: string;
    method: "get" | "post" | "put" | "delete";
    data?: object;
    headers?: Record<string, string>;
}

export interface IResponse<T extends Object | null> {
    status: number;
    // headers: object;
    headers: Record<string, string>;
    body: T;
}

export interface IResponseFields {
    IsSuccess: boolean;
    ErrorMessage: string | null;
}

export interface ILoginResponseBody extends IResponseFields {
    User: {
        _id: string;
        username: string;
        firstName: string;
        lastName: string;
        roles: string[];
        createdOn: string;
    };
}