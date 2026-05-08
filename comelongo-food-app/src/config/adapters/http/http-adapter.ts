export abstract class HttpAdapter {
    abstract get<T>(url: string, options?: Record<string, unknown> | undefined): Promise<T>;
}
