import axios from 'axios';
import * as U from '../App.utils';
import { APIResponse } from './model/Response';

const buildUrlWithParams = (url: string, params?: string | object | object[] | null ) => {
  let _url = url;
  if (params !== null) {
    _url = url + ((params != null) ? '?' : '');
    if (typeof params === "string") {
      _url += `params`;
    } else {
      for (const param in params) {
        if (Object.prototype.hasOwnProperty.call(params, param)) {
          type ObjectKey = keyof typeof params
          const key = param as ObjectKey;
          _url += `${param}=${params[key]}&`;
        }
      }
    }
  }
  return _url;
};

type Callback = (data?:object | object[] | string) => void

export interface IRestfulClient {
  get(url: string, params?: object | object[] | string | null, callback?: Callback):void
  post(url: string, params?: object | object[] | string | null, callback?: Callback):void
  getWithPromise(url: string, params?: string | object | object[]):Promise<APIResponse>
  postWithPromise (url: string, params: object | string | null, body?: string | object | object[]):Promise<APIResponse>
  putWithPromise(url: string, params?: object | string):Promise<APIResponse>
}

export class RestfulClient implements IRestfulClient {
  get (url: string, params: object | null, callback?: Callback): void {
    const _url = buildUrlWithParams(url, params);

    axios.get(_url).then(response => {
      (callback != null) && callback(JSON.parse(response.data));
    });
  }

  post (url: string, params: object | object[] | null, callback?: Callback):void {
    const contentType = this.getContentTypeByParams(params);
    const conf = this.getConf(contentType);
    axios.post(url, params, conf).then(res => {
      (callback != null) && callback(res.data);
    });
  }

  async getWithPromise (
    url: string,
    params?: string | object | object[],
  ):Promise<APIResponse> {
    const contentType = this.getContentTypeByParams(params);
    const conf = { params: params, ...this.getConf(contentType) };
    return await axios.get(url, conf)
      .then(response => {
        return { status: response ? response.status : 500, data: response ? response.data : null };
      })
      .catch(error => {
        const response = error.response;
        return { status: response.status, data: response.data };
      });
  }

  async postWithPromise (
    url: string,
    params: string | object | object[] | null,
    body?: string | object | object[]
  ):Promise<APIResponse> {
    const contentType = this.getContentTypeByParams(body);
    const conf = { params, ...this.getConf(contentType)};
    return await axios.post(url, body, conf)
      .then(response => {
        return { status: response ? response.status : 500, data: response ? response.data : null };
      })
      .catch(error => {
        const response = error.response;
        return { status: response ? response.status : 500, data: response ? response.data : null };
      });
  }

  async putWithPromise(url: string, params: object | string | undefined):Promise<APIResponse> {
    const contentType = this.getContentTypeByParams(params);
    const conf = this.getConf(contentType);
    return await axios.put(url, params, conf)
      .then(response => {
        return { status: response ? response.status : 500, data: response ? response.data : null };
      })
      .catch(error => {
        const response = error.response;
        return { status: response ? response.status : 500, data: response ? response.data : null };
      });
  }

  async deleteWithPromise(url:string, params?: object | string | null):Promise<APIResponse> {
    const contentType = this.getContentTypeByParams(params);
    const conf = this.getConf(contentType);
    return await axios.delete(url, conf)
      .then(response => {
        return { status: response ? response.status : 500, data: response ? response.data : null };
      })
      .catch(error => {
        const response = error.response;
        return { status: response ? response.status : 500, data: response ? response.data : null };
      });
  }

  getConf(contentType:string):object {
    return {
      headers: {
        'Content-Type': contentType
      }
    }
  }

  getContentTypeByParams (params?: string | object | object[] | null):string {
    if (params) {
      if (params instanceof FormData && params.has('file') && params.get('file') instanceof File) {
        return 'multipart/form-data';
      } else
      if (U.isJson(params)) {
        return 'application/json';
      }
    }
    return 'application/x-www-form-urlencoded';
  }
}

export default new RestfulClient();
