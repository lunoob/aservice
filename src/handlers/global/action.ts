/**
* @fileoverview 响应器的增删操作，采用适配器模式
* @author Luoob
*/

import { state } from './state'
import { SuccessHandler, ErrorHandler } from '../../types/handler'

/**
 * 创建成功响应处理器
 * @param {SuccessHandler} handler
 * @returns {number}
 */
export function createSuccess (handler: SuccessHandler) {
    state.setSuccessHandler(handler)
    const code = state.getSuccessCode()
    state.updateSuccessCode()
    return code
}

/**
 * 根据提供的 code 值，删除对应的成功处理器
 * @param {number} code
 * @returns {void}
 */
export function deleteSuccess (code: number) {
    state.deleteSuccess(code)
}

/**
 * 清空成功响应处理器
 * @returns {void}
 */
export function clearSuccess () {
    state.clearSuccess()
}

/**
 * 创建失败响应处理器
 * @param {SuccessHandler} handler
 * @returns {number}
 */
export function createError (handler: ErrorHandler) {
    state.setErrorHandler(handler)
    const code = state.getErrorCode()
    state.updateErrorCode()
    return code
}

/**
 * 根据提供的 code 值，删除对应的失败处理器
 * @param {number} code
 * @returns {void}
 */
export function deleteError (code: number) {
    state.deleteError(code)
}

/**
 * 清空失败响应处理器
 * @returns {void}
 */
export function clearError () {
    state.clearError()
}
