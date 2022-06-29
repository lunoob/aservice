/**
* @fileoverview Interceptor Types
* @author Luoob
*/

import { AxiosInterceptorOptions, AxiosResponse } from 'axios'
import { IAxiosRequestConfig } from './create'

export type onRequestFulfilled = (value: IAxiosRequestConfig) => IAxiosRequestConfig | Promise<IAxiosRequestConfig>
export type onResponseFulfilled = (value: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>
export type onRejected = (error: any) => any

export type RequestInterceptor = (
    onFulfilled: onRequestFulfilled,
    onRejected?: onRejected,
    options?: AxiosInterceptorOptions
) => number

export type ResponseInterceptor = (
    onFulfilled: onResponseFulfilled,
    onRejected?: onRejected,
    options?: AxiosInterceptorOptions
) => number
