/**
* @fileoverview Create Types
* @author Luoob
*/

import { AxiosRequestConfig } from 'axios'

export type Dynamic = Record<string, any>

export type ExtraConfig = {
    dynamic: Dynamic
}

export type IAxiosRequestConfig = AxiosRequestConfig & Partial<ExtraConfig>

export type Method =
    | 'get'
    | 'GET'
    | 'post'
    | 'POST'
    | 'put'
    | 'PUT'
    | 'delete'
    | 'DELETE'

export interface XhrParams {
    url: string
    method: Method
    params: any
    config?: IAxiosRequestConfig
}

export interface IResponse {
    status: number
    message?: string
    data: any
}

export interface HttpInsOption extends AxiosRequestConfig {
    baseURL: string
    prefix?: string
    useDefaultSuccessHandler?: boolean
    useDefaultErrorHandler?: boolean
}

export type MethodType = (
    method: Method,
    url: string,
    params: any,
    config?: IAxiosRequestConfig
) => Promise<IResponse>
