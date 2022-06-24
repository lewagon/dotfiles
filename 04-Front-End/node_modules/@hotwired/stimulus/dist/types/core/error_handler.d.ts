export interface ErrorHandler {
    handleError(error: Error, message: string, detail: object): void;
}
