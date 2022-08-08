/**
* @fileoverview 统一使用相应处理器
* @author Luoob
*/

import { HandlerAxiosInstance } from '../instance/index.js'
import { HttpInsOption } from '../../types/create'
import { state } from './state.js'
import { AxiosError, AxiosResponse } from 'axios'

/**
 * 统一使用错误响应处理器
 * @param {HandlerAxiosInstance} instance axios 实例
 * @param {HttpInsOption} option 创建 axios 实例的配置项
 * @returns {any}
 */
export function useErrorHandler (instance: HandlerAxiosInstance, option: HttpInsOption) {
    let errorHandlers = Object.values(instance.handlers.error)
    const errorQueue = state.getErrors(option.useDefaultErrorHandler!)
    errorHandlers = errorHandlers.concat(errorQueue)
    return (error: AxiosError): any => {
        return errorHandlers.reduce(
            (prev, handler: any) => handler(prev || error),
            null
        )
    }
}

/**
 * 统一使用成功响应处理器
 * @param {HandlerAxiosInstance} instance axios 实例
 * @param {HttpInsOption} option 创建 axios 实例的配置项
 * @returns {any}
 */
export function useSuccessHandler (instance: HandlerAxiosInstance, option: HttpInsOption) {
    let successHandlers = Object.values(instance.handlers.success)
    const successQueue = state.getSuccesses(option.useDefaultSuccessHandler!)
    successHandlers = successHandlers.concat(successQueue)
    return (response: AxiosResponse): any => {
        return successHandlers.reduce(
            (prev, handler: any) => handler(prev || response),
            null
        )
    }
}
