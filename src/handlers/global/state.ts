/**
* @fileoverview 全局相应处理器数据管理
* @author Luoob
*/

import { ErrorHandler, SuccessHandler } from '../../types/handler'
import { defaultSuccessHandler, defaultErrorHandler } from '../modules/default'

interface State {
    _successCode: number
    _errorCode: number
    _success: Record<number | string, SuccessHandler>
    _error: Record<number | string, ErrorHandler>
    _defaultSuccess: Record<number | string, SuccessHandler>
    _defaultError: Record<number | string, ErrorHandler>
    getSuccessCode: () => number
    getErrorCode: () => number
    updateSuccessCode: () => void
    updateErrorCode: () => void
    setSuccessHandler: (handler: SuccessHandler) => void
    setErrorHandler: (handler: ErrorHandler) => void
    deleteSuccess: (code: number) => void
    deleteError: (code: number) => void
    clearSuccess: () => void
    clearError: () => void
    getSuccesses: (useDefault: boolean) => SuccessHandler[]
    getErrors: (useDefault: boolean) => ErrorHandler[]
}

const state: State = {
    _successCode: 0,
    _errorCode: 0,
    _success: {},
    _error: {},
    _defaultSuccess: {
        1: defaultSuccessHandler
    },
    _defaultError: {
        1: defaultErrorHandler
    },
    updateSuccessCode () {
        this._successCode += 1
    },
    updateErrorCode () {
        this._errorCode += 1
    },
    getSuccessCode () {
        return this._successCode
    },
    getErrorCode () {
        return this._errorCode
    },
    setSuccessHandler (handler) {
        this._success[this.getSuccessCode()] = handler
    },
    setErrorHandler (handler) {
        this._error[this.getErrorCode()] = handler
    },
    deleteSuccess (code: number) {
        if (this._success[code] == null) {
            return
        }
        delete this._success[code]
    },
    deleteError (code: number) {
        if (this._error[code] == null) {
            return
        }
        delete this._error[code]
    },
    clearSuccess () {
        Object.keys(this._success).forEach((key) => {
            this.deleteSuccess(parseInt(key))
        })
    },
    clearError () {
        Object.keys(this._error).forEach((key) => {
            this.deleteError(parseInt(key))
        })
    },
    getSuccesses (useDefault: boolean = true) {
        const successList = Object.values(this._success)

        const lastHandlers = useDefault
            ? Object.values(this._defaultSuccess)
            : [(response: any) => response]

        successList.push(...lastHandlers)
        return successList
    },
    getErrors (useDefault: boolean) {
        const errorList = Object.values(this._error)

        const lastHandlers = useDefault
            ? Object.values(this._defaultError)
            : [(error: any) => error]

        errorList.push(...lastHandlers)
        return errorList
    }
}

export { state }
