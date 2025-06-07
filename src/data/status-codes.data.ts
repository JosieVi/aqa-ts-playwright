// Description:
// This file defines an enumeration for HTTP status codes used in the application.

export enum STATUS_CODES {
    OK = 200,
    CREATED = 201,
    DELETED = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,
    SERVER_ERROR = 500,
    CUSTOMER_DUPLICATED = 409,
}