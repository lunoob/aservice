/**
* @fileoverview 拦截器的增删操作，采用适配器模式
* @author Luoob
*/

import { state } from './state'
import { IAxios } from '../../types/instance'
import { onRequestFulfilled, onRejected, onResponseFulfilled } from '../../types/interceptor'
import { AxiosInterceptorOptions } from 'axios'

/**
 * 增强 axios 实例，为其身上拓展属性
 * @param {IAxios} instance
 * @returns {any}
 */
function enhanceInstance (instance: IAxios) {
    Object.defineProperties(instance, {
        iCode: {
            value: state.getInstanceSize(),
            enumerable: true
        },
        iKeyCode: {
            value: Object.defineProperties(Object.create(null), {
                request: {
                    value: Object.create(null),
                    enumerable: true
                },
                response: {
                    value: Object.create(null),
                    enumerable: true
                }
            }),
            enumerable: true
        }
    })
}

/**
 * 增加 axios 实例
 * @param {IAxios} instance axios 实例
 * @returns {void}
 */
export function addInstance (instance: IAxios) {
    enhanceInstance(instance)
    state.addInstance(instance)
    // 注册用户增加的请求拦截器
    state.registerRequest(instance)
    // 注册默认请求拦截器
    state.registerDefaultRequest(instance)
    // 注册默认响应拦截器
    state.registerDefaultResponse(instance)
    // 注册用户增加的响应拦截器
    state.registerResponse(instance)
}

/**
 * 增加请求拦截器
 * @param {onRequestFulfilled} onFulfilled 请求发送前执行一些逻辑
 * @param {onRejected} onRejected 请求发生失败执行一些逻辑
 * @param {AxiosInterceptorOptions} options 拦截器参数
 * @returns {number}
 */
export function createRequest (
    onFulfilled: onRequestFulfilled,
    onRejected?: onRejected,
    options?: AxiosInterceptorOptions
): number {
    state.setRequest([onFulfilled, onRejected, options])
    const code = state.getReqCode()
    state.updateReqCode()
    return code
}

/**
 * 增加响应拦截器
 * @param {onResponseFulfilled} onFulfilled 请求响应成功执行一些逻辑
 * @param {onRejected} onRejected 请求响应失败执行一些逻辑
 * @param {AxiosInterceptorOptions} options 拦截器参数
 * @returns {number}
 */
export function createResponse (
    onFulfilled: onResponseFulfilled,
    onRejected?: onRejected,
    options?: AxiosInterceptorOptions
): number {
    state.setResponse([onFulfilled, onRejected, options])
    const code = state.getResCode()
    state.updateResCode()
    return code
}

/**
 * 根据提供的 code 值，删除对应的请求拦截器
 * @param {number} code
 * @returns {void}
 */
export function deleteRequest (code: number) {
    state.deleteRequest(code)
}

/**
 * 根据提供的 code 值，删除对应的相应拦截器
 * @param {number} code
 * @returns {void}
 */
export function deleteResponse (code: number) {
    state.deleteResponse(code)
}

/**
 * 清空请求拦截器
 * @returns {void}
 */
export function clearRequest () {
    state.clearRequest()
}

/**
 * 清空响应拦截器
 * @returns {void}
 */
export function clearResponse () {
    state.clearResponse()
}
