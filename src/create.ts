/**
* @fileoverview http 请求器
* @author Luoob
*/

import axios from 'axios'
import { useInterceptors, createInterceptor } from './interceptors'
import { useSuccessHandler, useErrorHandler, createHandler } from './handlers'
import { HttpInsOption, XhrParams, IResponse, Method, IAxiosRequestConfig } from './types/create'
import { curry } from 'ramda'
import { reverseRequest } from './helpers'

/**
 * 创建 http 请求实例
 * @param {HttpInsOption} option 创建实例需要的参数
 * @returns {any}
 */
function createHttpInstance (option: HttpInsOption) {
    const instance = axios.create({
        ...option,
        baseURL: option.baseURL.replace(/\/$/, '') + (option.prefix || ''),
        timeout: 30 * 1000
    })

    const http = ({ url, params, method = 'get', config = {} }: XhrParams): Promise<IResponse> => {
        const useBody = ['post', 'put'].includes(method.toLocaleLowerCase())

        // 反转请求拦截器
        // 实现队列的效果（先注册先试用）
        // @ts-ignore
        instance.interceptors.request.handlers = reverseRequest(instance.interceptors.request.handlers)

        return instance({
            url,
            method,
            params: useBody ? undefined : params,
            data: useBody ? params : undefined,
            ...config
        })
            // @ts-ignore
            .then(useSuccessHandler(instance, option))
            // @ts-ignore
            .catch(useErrorHandler(instance, option))
    }

    return {
        instance,
        http
    }
}

/**
 * 创建请求器
 * @param {HttpInsOption} option
 * @returns {any}
 */
export function createRequest (option: HttpInsOption) {
    const defaultOption: HttpInsOption = {
        baseURL: '/',
        useDefaultSuccessHandler: true,
        useDefaultErrorHandler: true
    }
    option = { ...defaultOption, ...option }
    const { instance, http } = createHttpInstance(option)

    const createRequestMethod = (method: Method, url: string) => {
        return (params?: any, config?: IAxiosRequestConfig): Promise<IResponse> => {
            return http({ url, method, params, config })
        }
    }

    const interceptorMethods = createInterceptor(instance)
    const handlerMethods = createHandler(instance)

    // 注册拦截器
    useInterceptors(instance)

    return {
        getInstance: () => instance,
        request: curry(createRequestMethod),
        ...interceptorMethods,
        ...handlerMethods
    }
}
