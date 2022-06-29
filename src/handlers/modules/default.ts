/**
* @fileoverview 默认的相应处理器模块
* @author Luoob
*/

import { AxiosError, AxiosResponse } from 'axios'
import { ResponseData } from '../../types/handler'

/**
 * 成功响应处理, 属于最后一个执行的处理器
 * @param {AxiosResponse} response
 * @returns {ResponseData}
 */
export function defaultSuccessHandler (response: AxiosResponse): ResponseData {
    const data = response.data

    return {
        status: data.status || response.status,
        message: data.message || response.statusText,
        data: data.data || data
    }
}

/**
* 失败、错误响应处理器。属于最后一个执行的处理器
* @param {AxiosError} err
* @returns {ResponseData}
*/
export function defaultErrorHandler (error: AxiosError): ResponseData {
    return {
        status: error.status || -1,
        message: '接口请求失败，请重试',
        data: ''
    }
}
