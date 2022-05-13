export declare class XandrError extends Error {
    error: string;
    code: string;
    status: number;
    headers: Record<string, string>;
    constructor(error: string, code: string, status: number, headers: Record<string, string>);
}
