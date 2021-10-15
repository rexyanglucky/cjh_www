import { AxiosRequestConfig } from 'axios';

// export type requestType = 'json' | 'form' | 'url' | 'text';
export type requestType = 'json' | 'form' | 'text';
export interface Headers {
  page?: string;
  token?: string | null;
  bizname?: string;
  bizid?: number;
  'client-id'?: number;
  traceId?: string;
  'Content-Type'?: string;
}
export interface RequestConfig extends AxiosRequestConfig {
  coverHeader?: boolean;
  requestType?: requestType;
}
export interface ResponseT {
  data: {
    code: number;
  };
}
