import axios, { AxiosRequestConfig, Method, AxiosResponse } from 'axios';
import { getGMT8Time } from '@/utils';
import qs from 'querystringify';
import Message from '@/common/Message/';
import Loading from '@/common/Loading/';
import CustomError from '@/common/js/customError';
import config from '@/config/';
import { requestType, Headers, RequestConfig, ResponseT } from './interface.d';
import { getLoginToken, logout, redirectToIndex } from '../authority';
const requestedMap: { [key: string]: Promise<unknown> } = {};

const httpCodeMessage = {
  200: '200 服务器成功返回请求的数据。',
  201: '201 新建或修改数据成功。',
  202: '202 一个请求已经进入后台排队（异步任务）。',
  204: '204 删除数据成功。',
  400: '400 发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '401 用户没有权限（令牌、用户名、密码错误）。',
  403: '403 用户得到授权，但是访问是被禁止的。',
  404: '404 发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '406 请求的格式不可得。',
  410: '410 请求的资源被永久删除，且不会再得到的。',
  422: '422 当创建一个对象时，发生一个验证错误。',
  500: '500 服务器发生错误，请检查服务器。',
  502: '502 网关错误。',
  503: '503 服务不可用，服务器暂时过载或维护。',
  504: '504 网关超时。',
  505: '505 HTTP版本不受支持',
};
const { baseUrl } = config;

/**
 * 处理返回类型为blob请求
 */
function handlBlobResponse(response: AxiosResponse<Blob>) {
  const fileName = decodeURIComponent(
    response.headers['content-disposition'].split(';')[1].split('filename=')[1]
  );
  const reader = new FileReader();
  reader.readAsDataURL(response.data);
  reader.onload = function (e: any) {
    // 转换完成，创建一个a标签用于下载
    if (e.target) {
      const a = document.createElement('a');
      a.download = fileName;
      a.href = e.target.result as string;
      document.body.appendChild(a);
      a.click();
      a.remove();
    }
    //$(a).remove();
  };
}
// error type
// server 服务器返回，状态码错误
// http http code 不为 200
// auth 未登录

axios.interceptors.request.use((request) => {
  if (request.method === 'GET' || request.method === 'get') {
    request.paramsSerializer = (params) => {
      return qs.stringify(params);
    };
  }
  return request;
});

// Add a response interceptor
axios.interceptors.response.use(
  (response) => {
    const { code } = response.data as { code: number };
    let error: CustomError | undefined;
    if (code === 19 || code === 205 || code === 5) {
      const codeMap = {
        19: '你的账号在其他设备登录，当前账号已下线。',
        205: '检测到你的网络发生变化，请重新登录。',
        5: '登录过期，请重新登录。',
      };
      setTimeout(() => {
        logout();
      }, 3000);
      error = new CustomError('auth', codeMap[code]);
      Message.error(error.message);
      return Promise.reject(error);
    } else if (code === 3067 || code === 1253) {
      setTimeout(() => {
        redirectToIndex();
      }, 3000);
      error = new CustomError('notAccess', '无权限访问该页面，将跳转到首页。');
      Message.error(error.message);
      return Promise.reject(error);
    }
    const date: Date =
      response.headers && response.headers.date
        ? new Date(response.headers.date)
        : new Date();
    if (response.data && typeof response.data === 'object') {
      (response.data as any).serverDate = getGMT8Time(date);
    }
    return response;
  },
  (err) => {
    if (err && err.response && err.response.status) {
      err.message =
        (httpCodeMessage as any)[err.response.status] || err.response.status;
    }
    err.name = '网络请求异常';
    return Promise.reject(err);
    // Sentry.captureException(err);
    // logHelper.error(err, 'error');
  }
);

/**
 * 添加业务所需header
 */
function addBusinessHeaders(): Headers {
  // const headers: Headers = { bizname: 'user_web', bizid: 4 };
  const headers: Headers = {};

  // const headers: Headers = { ...getClientInfo() };
  if (window) {
    headers.page = window.location.href;
  }
  const token = getLoginToken();
  if (token) {
    headers.token = token;
  }
  const transactionId = Math.random().toString(36).substr(2, 9);
  headers.traceId = transactionId;
  return headers;
}
/**
 * 处理content-type
 * @param type requestType
 */
function getHeaders(type?: requestType): Headers | null {
  if (type) {
    const header: Headers = {};
    const contentTypeMap = {
      json: 'application/json',
      text: 'application/text',
      // form: 'multiple/form-data',
      form: 'application/x-www-form-urlencoded',
      // application/x-www-form-urlencoded;charset=UTF-8
    };
    header['Content-Type'] = contentTypeMap[type];
    return header;
  }
  return null;
}

export function request(
  url: string,
  options: RequestConfig = { coverHeader: false, requestType: 'form' }
) {
  const tempOptions: RequestConfig = {
    requestType: 'form',
    coverHeader: false,
  };
  const roptions = { ...tempOptions, ...options };
  let headers = getHeaders(roptions.requestType);
  if (!options.coverHeader) {
    // 如果不清除自定义header，则添加
    headers = { ...headers, ...addBusinessHeaders() };
  }
  const obj: AxiosRequestConfig = {
    ...roptions,
    headers: { ...headers, ...options.headers } as Record<string, string>,
    timeout: 1000 * 60,
  };
  if (options.requestType === 'json') {
    obj.data = JSON.stringify(options.data);
  } else if (options.requestType === 'form') {
    obj.data = qs.stringify(options.data);
  }
  obj.url = url;
  return axios
    .request<ResponseT>(obj)
    .then(genNext(url))
    .finally(() => {
      Loading.hide();
    });
}
export function get(
  url: string,
  params: unknown = null,
  host = baseUrl,
  showLoading = true
) {
  if (showLoading) {
    Loading.show();
  }
  host = host || baseUrl;
  return request(url, { method: 'get', params, baseURL: host });
  // return fetch(url, null, 'get', params, host, 'form');
}
export function post(
  url: string,
  data: unknown = null,
  host = baseUrl,
  type: requestType = 'form',
  showLoading = true
) {
  if (showLoading) {
    Loading.show();
  }
  host = host || baseUrl;
  return request(url, {
    method: 'post',
    data,
    baseURL: host,
    requestType: type,
  });

  // return fetch(url, data, 'post', null, host, type);
}
export function genNext(url: string) {
  return (response: AxiosResponse<any>) => {
    Loading.hide();
    if (response && response.data) {
      if (response.data instanceof Blob) {
        handlBlobResponse(response);
        return Promise.resolve(response.data);
      }
      if (response.data.code < 0) {
        const error = new CustomError(
          '接口异常',
          `接口名称:${url}\r\n返回值:${JSON.stringify(response.data)}`
        );
        Message.error(response.data.msg || error.name);
        return Promise.reject(error);
      } else {
        if (response.data.code === 702) {
          const error = new CustomError('接口异常', `访问流量大，请稍后再试`);
          Message.error(response.data.msg || error.message);
          return Promise.reject(error);
        }
        return Promise.resolve(response.data);
      }
    } else if (response && response.headers) {
      return Promise.resolve(response.headers);
    }
  };
}

export function multiplyGet(
  url: string,
  params: Record<string, unknown> = {},
  host = baseUrl,
  showLoading = true
): Promise<any> {
  const completeUrl = `${host}${url}` + qs.stringify(params, '?');
  if (!requestedMap[completeUrl]) {
    requestedMap[completeUrl] = get(url, params, host, showLoading);
  }
  return requestedMap[completeUrl];
}
