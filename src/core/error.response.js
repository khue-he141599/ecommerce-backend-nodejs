const StatusCode = {
    FORBBIDEN: 403,
    CONFLICT: 409,
};

const ReasonStatusCode = {
    FORBBIDEN: "Bad request error",
    CONFLICT: "Conflect error",
};

class ErrorResponse extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

class ConflictRequestError extends ErrorResponse {
    constructor(message = ReasonStatusCode.CONFLICT, status = StatusCode.CONFLICT) {
        super(message, status);
    }
}

class ForbbidenRequestError extends ErrorResponse {
    constructor(message = ReasonStatusCode.FORBBIDEN, status = StatusCode.FORBBIDEN) {
        super(message, status);
    }
}

module.exports = {
    ConflictRequestError,
    ForbbidenRequestError,
};
