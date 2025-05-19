export interface IRequestOptions {
    baseURL?: string;
    url: string;
    method: "get" | "post" | "put" | "delete";
    data?: object;
    headers?: Record<string, string>;
}

export interface IResponse<T extends object | null> {
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

export type sortDirection = "asc" | "desc";

export type customersSortField = "createdOn" | "email" | "name" | "country";