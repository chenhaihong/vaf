import type {
  Axios,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

declare module "axios" {
  interface AxiosInstance extends Axios {
    <T = any, R = AxiosResponse<T>, D = any>(
      config: AxiosRequestConfig<D>
    ): Promise<[Error | null, R | null]>;
  }

  interface AxiosInterceptorManager<V> {
    use(
      onFulfilled?: (value: V) => [Error | null, any | null],
      onRejected?: (error: any) => [Error, null]
    ): number;
  }
}
