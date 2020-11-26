
enum LogLevel {
  ERROR
}

export interface LogObject {
  errorType: string;
  message: string | Event;
  source?: string | undefined,
  lineno?: number | undefined,
  colno?: number | undefined,
  error?: Error | undefined
}


export class Logger {

  private static instance: Logger | null = null;
  protected subscribers: any = [];

  constructor() {

    if (Logger.instance) {
      return Logger.instance;
    }
    Logger.instance = this

    this.ListenErrors()

    console.log('Logger started....');
  }

  private ListenErrors(): void {
    const storeLog = (e: LogObject) => {
      this.storageLog(e)
    }
    window.onerror = function (
      message: string | Event,
      source: string | undefined,
      lineno: number | undefined,
      colno: number | undefined,
      error: Error | undefined
    ) {
      storeLog({
        errorType: LogLevel[LogLevel.ERROR],
        message,
        source,
        lineno,
        colno,
        error
      })
      return false;
    }
  }

  private storageLog(data: LogObject): void {
    console.log(`Logger [${data.errorType}]`, data);
    this.deliver(data)
  }

  public static getInstance(): Logger {
    Logger.instance = Logger.instance || new Logger();
    return Logger.instance;
  }

  private deliver(data: LogObject) {
    this.subscribers.forEach(
      function (fn: CallableFunction) {
        fn(data);
      }
    );
    return this;
  };

  public subscribe(listener: CallableFunction) {
    this.subscribers.push(listener);
    return this;
  };

}