/**
* @fileoverview 实例的响应处理器方法
* @author Luoob
*/

import { AxiosInstance, AxiosResponse, AxiosError } from 'axios'
import { pick } from 'ramda'

// 成功响应处理器
type SuccessHandler = (response: AxiosResponse) => AxiosResponse
// 错误响应处理器
type ErrorHandler = (response: AxiosError) => AxiosError

interface HandlerObj {
    addSuccessHandler: (handler: SuccessHandler) => number
    addErrorHandler: (handler: ErrorHandler) => number
    clearSuccessHandler: (code?: number) => void
    clearErrorHandler: (code?: number) => void
}

export type HandlerAxiosInstance = AxiosInstance & {
    handlers: {
        success: Record<string | number, SuccessHandler>
        error: Record<string | number, ErrorHandler>
        sucessCount: number
        errorCount: number
    }
}

/**
 * 增加成功响应处理器
 * @param {SuccessHandler} handler 成功响应处理器
 * @returns {number}
 */
function addSuccessHandler (handler: SuccessHandler) {
    // @ts-ignore
    const self = this as HandlerAxiosInstance
    const code = self.handlers.sucessCount
    self.handlers.success[code] = handler
    self.handlers.sucessCount += 1
    return code
}

/**
 * 增加失败响应处理器
 * @param {ErrorHandler} handler 失败响应处理器
 * @returns {number}
 */
function addErrorHandler (handler: ErrorHandler) {
    // @ts-ignore
    const self = this as HandlerAxiosInstance
    const code = self.handlers.errorCount
    self.handlers.error[code] = handler
    self.handlers.errorCount += 1
    return code
}

/**
 * 清除成功处理器
 * @param {number?} code 成功处理器对应的唯一码
 * @returns {void}
 */
function clearSuccessHandler (code?: number) {
    // @ts-ignore
    const self = this as HandlerAxiosInstance
    if (code != null) {
        delete self.handlers.success[code]
    }
    Object.keys(self.handlers.success).forEach(key => {
        delete self.handlers.success[key]
    })
}

/**
 * 清除失败处理器
 * @param {number} code 失败处理器对应的唯一码
 * @returns {void}
 */
function clearErrorHandler (code?: number) {
    // @ts-ignore
    const self = this as HandlerAxiosInstance
    if (code != null) {
        delete self.handlers.error[code]
    }
    Object.keys(self.handlers.error).forEach(key => {
        delete self.handlers.error[key]
    })
}

/**
 * 创建 axios 实例自身的响应处理器
 * @param {AxiosInstance} ins
 * @returns {any}
 */
export function createHandler (ins: AxiosInstance): HandlerObj {
    Object.defineProperty(ins, 'handlers', {
        value: Object.defineProperties(Object.create(null), {
            success: {
                value: {},
                enumerable: true
            },
            sucessCount: {
                value: 0,
                enumerable: true,
                writable: true
            },
            error: {
                value: {},
                enumerable: true
            },
            errorCount: {
                value: 0,
                enumerable: true,
                writable: true
            }
        })
    })

    Object.defineProperties(ins, {
        addSuccessHandler: {
            value: addSuccessHandler.bind(ins),
            enumerable: true
        },
        addErrorHandler: {
            value: addErrorHandler.bind(ins),
            enumerable: true
        },
        clearSuccessHandler: {
            value: clearSuccessHandler.bind(ins),
            enumerable: true
        },
        clearErrorHandler: {
            value: clearErrorHandler.bind(ins),
            enumerable: true
        }
    })

    return pick([
        'addSuccessHandler',
        'addErrorHandler',
        'clearSuccessHandler',
        'clearErrorHandler'
    ], ins) as HandlerObj
}
