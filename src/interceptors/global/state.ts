/**
* @fileoverview 全局拦截器数据管理
* @author Luoob
*/

import dynamicInterceptor from '../modules/dynamic.js'
import { AxiosInterceptorOptions } from 'axios'
import { onRejected, onRequestFulfilled, onResponseFulfilled } from '../../types/interceptor'
import { IAxios } from '../../types/instance'

// 请求拦截器队列
export type request = [
    onRequestFulfilled,
    onRejected | undefined,
    AxiosInterceptorOptions | undefined
]

// 响应拦截器队列
export type response = [
    onResponseFulfilled,
    onRejected | undefined,
    AxiosInterceptorOptions | undefined
]

type State = {
    _instances: IAxios[]
    _reqCode: number
    _resCode: number
    _request: Record<number | string, request>
    _response: Record<number | string, response>
    _defaultRequest: Record<number | string, request>,
    _defaultResponse: Record<number | string, response>,
    getReqCode: () => number
    getResCode: () => number
    updateReqCode: () => void
    updateResCode: () => void
    setRequest: (args: request) => void
    setResponse: (args: response) => void
    addInstance: (instance: IAxios) => number
    getInstanceSize: () => number
    registerRequest: (instance: IAxios) => void
    registerResponse: (instance: IAxios) => void
    registerDefaultRequest: (instance: IAxios) => void
    registerDefaultResponse: (instance: IAxios) => void
    deleteRequest: (code: number) => void
    deleteResponse: (code: number) => void
    clearRequest: () => void
    clearResponse: () => void
}

const state: State = {
    _defaultRequest: {
        1: [dynamicInterceptor, undefined, undefined]
    },
    _defaultResponse: {},
    _instances: [],
    _reqCode: 0,
    _resCode: 0,
    _request: {},
    _response: {},
    getReqCode () {
        return this._reqCode
    },
    getResCode () {
        return this._resCode
    },
    updateReqCode () {
        this._reqCode += 1
    },
    updateResCode () {
        this._resCode += 1
    },
    setRequest (args) {
        this._request[this.getReqCode()] = args
    },
    setResponse (args) {
        this._response[this.getResCode()] = args
    },
    addInstance (instance: IAxios) {
        return this._instances.push(instance)
    },
    getInstanceSize () {
        return this._instances.length
    },
    registerDefaultRequest (instance) {
        Object.keys(this._defaultRequest).forEach(key => {
            const interceptor = this._defaultRequest[key]
            // 后续不用进行删除
            interceptor && instance.addReqInterceptor(...interceptor)
        })
    },
    registerDefaultResponse (instance) {
        Object.keys(this._defaultResponse).forEach(key => {
            const interceptor = this._defaultResponse[key]
            interceptor && instance.addResInterceptor(...interceptor)
        })
    },
    registerRequest (instance) {
        Object.keys(this._request)
            .forEach(key => {
                const code = instance.addReqInterceptor(...this._request[key])
                // key => code
                instance.iKeyCode.request[key] = code
            })
    },
    registerResponse (instance) {
        Object.keys(this._response).forEach(key => {
            const code = instance.addResInterceptor(...this._response[key])
            // key => code
            instance.iKeyCode.response[key] = code
        })
    },
    deleteRequest (code: number) {
        if (this._request[code] == null) {
            return
        }

        // 先删除全局记录
        delete this._request[code]
        // 再删除实例身上的
        this._instances.forEach(instance => {
            const iKeyCode = instance.iKeyCode.request
            instance.interceptors.request.eject(iKeyCode[code] as number)
        })
    },
    deleteResponse (code: number) {
        if (this._response[code] == null) {
            return
        }

        // 先删除全局记录
        delete this._response[code]
        // 再删除实例身上的
        this._instances.forEach(instance => {
            const iKeyCode = instance.iKeyCode.response
            instance.interceptors.response.eject(iKeyCode[code] as number)
        })
    },
    clearRequest () {
        Object.keys(this._request).forEach(key => {
            this.deleteRequest(parseInt(key))
        })
    },
    clearResponse () {
        Object.keys(this._response).forEach(key => {
            this.deleteResponse(parseInt(key))
        })
    }
}

export { state }
