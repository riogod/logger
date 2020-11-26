"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["ERROR"] = 0] = "ERROR";
})(LogLevel || (LogLevel = {}));
class Logger {
    constructor() {
        this.subscribers = [];
        if (Logger.instance) {
            return Logger.instance;
        }
        Logger.instance = this;
        this.ListenErrors();
        console.log('Logger started....');
    }
    ListenErrors() {
        const storeLog = (e) => {
            this.storageLog(e);
        };
        window.onerror = function (message, source, lineno, colno, error) {
            storeLog({
                errorType: LogLevel[LogLevel.ERROR],
                message,
                source,
                lineno,
                colno,
                error
            });
            return false;
        };
    }
    storageLog(data) {
        console.log(`Logger [${data.errorType}]`, data);
        this.deliver(data);
    }
    static getInstance() {
        Logger.instance = Logger.instance || new Logger();
        return Logger.instance;
    }
    deliver(data) {
        this.subscribers.forEach(function (fn) {
            fn(data);
        });
        return this;
    }
    ;
    subscribe(listener) {
        this.subscribers.push(listener);
        return this;
    }
    ;
}
exports.Logger = Logger;
Logger.instance = null;
