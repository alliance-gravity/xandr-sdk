"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XandrError = void 0;
class XandrError extends Error {
    constructor(error, code, status, headers) {
        super(`${code}: ${error} (HTTP ${status})`);
        this.error = error;
        this.code = code;
        this.status = status;
        this.headers = headers;
    }
}
exports.XandrError = XandrError;
