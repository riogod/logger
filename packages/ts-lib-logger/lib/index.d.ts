export interface LogObject {
    errorType: string;
    message: string | Event;
    source?: string | undefined;
    lineno?: number | undefined;
    colno?: number | undefined;
    error?: Error | undefined;
}
export declare class Logger {
    private static instance;
    protected subscribers: any;
    constructor();
    private ListenErrors;
    private storageLog;
    static getInstance(): Logger;
    private deliver;
    subscribe(listener: CallableFunction): this;
}
