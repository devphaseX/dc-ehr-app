// api.ts
type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface RequestOptions<T = unknown> extends Omit<RequestInit, "method"> {
  params?: Record<string, string>;
  middleware?: MiddlewareFunction[];
  formData?: FormData;
  validateResponse?: (data: T) => T;
}

type MiddlewareFunction = (request: Request) => Promise<Request>;

interface ApiResponse<T = any> {
  data: T;
  status: number;
  headers: Headers;
}

const defaultMiddleware: MiddlewareFunction[] = [
  async (request: Request) => {
    if (!request.headers.has("Content-Type")) {
      request.headers.set("Content-Type", "application/json");
    }
    return request;
  },
];

const parseJSON = async <T>(response: Response): Promise<T> => {
  if (response.status === 204 || response.status === 205) {
    return null as T;
  }

  return response.json();
};

const checkStatus = (
  response: Response,
  throwOnFailedStatus?: boolean,
): Response => {
  if (
    (response.status >= 200 && response.status < 300) ||
    !throwOnFailedStatus
  ) {
    return response;
  }
  const error = new Error(response.statusText);
  (error as any).response = response;
  throw error;
};

interface HookContext {
  request: Request;
  options: Omit<ExtendedRequestOptions<any>, "validateResponse">;
}

interface BeforeRetryContext extends HookContext {
  error: Error;
  retryCount: number;
}

type BeforeRequestHook = (
  request: Request,
  context: HookContext,
) => Promise<Request> | Request;
type BeforeRetryHook = (context: BeforeRetryContext) => Promise<void> | void;
type AfterResponseHook<T> = (
  response: ApiResponse<T>,
  context: HookContext,
) => Promise<ApiResponse<T>> | ApiResponse<T>;

interface ApiOptions {
  getToken: () => Promise<string | null> | string | null;
  baseUrl?: string;
  onAuthError?: () => void;
  hooks?: {
    beforeRequest?: BeforeRequestHook[];
    beforeRetry?: BeforeRetryHook[];
    afterResponse?: AfterResponseHook<any>[];
  };
}

interface ExtendedRequestOptions<T> extends RequestOptions<T> {
  validateResponse?: (data: T) => T;
  retry?: number;
  throwOnFailedStatus?: boolean;
}

const createApi = ({ getToken, baseUrl, hooks }: ApiOptions) => {
  const applyBeforeRequestHooks = async (
    request: Request,
    context: HookContext,
  ): Promise<Request> => {
    if (!hooks?.beforeRequest) return request;
    let result = request;
    for (const hook of hooks.beforeRequest) {
      result = await hook(result, context);
    }
    return result;
  };

  const applyBeforeRetryHooks = async (
    context: BeforeRetryContext,
  ): Promise<void> => {
    if (!hooks?.beforeRetry) return;
    for (const hook of hooks.beforeRetry) {
      await hook(context);
    }
  };

  const applyAfterResponseHooks = async <T>(
    apiResponse: ApiResponse<T>,
    context: HookContext & { request: Request },
  ): Promise<ApiResponse<T>> => {
    if (!hooks?.afterResponse) return apiResponse;
    let result = apiResponse;
    for (const hook of hooks.afterResponse) {
      result = await hook(result, context);
    }
    return result;
  };
  const request = async <T>(
    methodOrRequest: HttpMethod | Request,
    urlOrOptions?: string | ExtendedRequestOptions<T>,
    optionsOrUndefined?: ExtendedRequestOptions<T>,
  ): Promise<ApiResponse<T>> => {
    let req: Request;
    let options: ExtendedRequestOptions<T> = {};

    if (methodOrRequest instanceof Request) {
      req = methodOrRequest;
      options = (urlOrOptions as ExtendedRequestOptions<T>) || {};
    } else {
      const method = methodOrRequest;
      const url = urlOrOptions as string;
      options = optionsOrUndefined || {};
      const {
        validateResponse,
        retry,
        throwOnFailedStatus,
        ...requestOptions
      } = options;

      const fullUrl = `${baseUrl ? baseUrl : "/api/v1"}${url}`;
      let requestInit: RequestInit = { ...requestOptions, method };

      if (requestOptions.body && !(requestOptions.body instanceof FormData)) {
        requestInit.body = JSON.stringify(requestOptions.body);
        requestInit.headers = {
          ...requestInit.headers,
          "Content-Type": "application/json",
        };
      }

      req = new Request(fullUrl, requestInit);
    }

    const { validateResponse, retry = 0, throwOnFailedStatus } = options;

    const context: HookContext = { request: req, options };
    // Apply beforeRequest hooks
    req = await applyBeforeRequestHooks(req, context);
    context.request = req; // Update context with potentially modified request

    const token = await getToken();
    if (token) {
      req.headers.set("Authorization", `Bearer ${token}`);
    }

    let retryCount = 0;
    while (true) {
      try {
        let response = await fetch(req);
        const checkedResponse = checkStatus(response, throwOnFailedStatus);
        let data = await parseJSON<T>(response);
        if (validateResponse) {
          try {
            data = validateResponse(data) as Awaited<T>;
          } catch (error) {
            console.error("Response validation failed:", error);
            throw error;
          }
        }

        let apiResponse: ApiResponse<T> = {
          data,
          status: checkedResponse.status,
          headers: checkedResponse.headers,
        };

        // Apply afterResponse hooks
        apiResponse = await applyAfterResponseHooks(apiResponse, {
          ...context,
          request: req,
        });

        return {
          data,
          status: checkedResponse.status,
          headers: checkedResponse.headers,
        };
      } catch (error) {
        if (retryCount < retry) {
          // Apply beforeRetry hooks
          await applyBeforeRetryHooks({
            ...context,
            error: error as Error,
            retryCount,
          });
          retryCount++;
        } else {
          throw error;
        }
      }
    }
  };

  return {
    get: <T>(url: string, options?: ExtendedRequestOptions<T>) =>
      request<T>("GET", url, options),
    post: <T>(
      url: string,
      data?: any | FormData,
      options?: ExtendedRequestOptions<T>,
    ) =>
      request<T>("POST", url, {
        ...options,
        ...(data instanceof FormData ? { formData: data } : { body: data }),
      }),
    put: <T>(
      url: string,
      data?: any | FormData,
      options?: ExtendedRequestOptions<T>,
    ) =>
      request<T>("PUT", url, {
        ...options,
        ...(data instanceof FormData ? { formData: data } : { body: data }),
      }),
    patch: <T>(
      url: string,
      data?: any | FormData,
      options?: ExtendedRequestOptions<T>,
    ) =>
      request<T>("PATCH", url, {
        ...options,
        ...(data instanceof FormData ? { formData: data } : { body: data }),
      }),
    delete: <T>(url: string, options?: ExtendedRequestOptions<T>) =>
      request<T>("DELETE", url, options),
    execute: <T>(req: Request, options?: ExtendedRequestOptions<T>) =>
      request<T>(req, options),
  };
};

export default createApi;
