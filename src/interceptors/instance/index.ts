import { AxiosInstance, AxiosInterceptorOptions } from 'axios'
import { onRejected, onRequestFulfilled, onResponseFulfilled } from '../../types/interceptor'
import { IAxios, InterceptorObj } from '../../types/instance'
import { pick } from 'ramda'

/**
 * 创建实例请求拦截器
 * @param {onRequestFulfilled} onFulfilled Do something before request is sent
 * @param {onRejected} onRejected Do something with request error
 * @param {AxiosInterceptorOptions} options
 * @returns {number}
 */
function addReqInterceptor (
    onFulfilled: onRequestFulfilled,
    onRejected?: onRejected,
    options?: AxiosInterceptorOptions
): number {
    // @ts-ignore
    const self = this as IAxios

    const code = self.interceptors.request.use(onFulfilled, onRejected, options)

    self.reqInterceptorCode[code] = true
    return code
}

/**
 * 创建实例响应拦截器
 * @param {onRequestFulfilled} onFulfilled Do something before request is sent
 * @param {onRejected} onRejected Do something with request error
 * @param {AxiosInterceptorOptions} options
 * @returns {number}
 */
function addResInterceptor (
    onFulfilled: onResponseFulfilled,
    onRejected?: onRejected,
    options?: AxiosInterceptorOptions
): number {
    // @ts-ignore
    const self = this as IAxios

    const code = self.interceptors.response.use(onFulfilled, onRejected, options)

    self.resInterceptorCode[code] = true
    return code
}

/**
 * 删除或清空请求拦截器
 * @param {number} code
 * @returns {void}
 */
function clearReqInterceptor (code?: number) {
    // @ts-ignore
    const self = this as IAxios

    if (
        code != null &&
        typeof code === 'number' &&
        self.reqInterceptorCode[code]
    ) {
        delete self.reqInterceptorCode[code]
        // @ts-ignore
        return self.interceptors.request.eject(code)
    }

    // 遍历删除
    Object.keys(self.reqInterceptorCode).forEach(key => {
        self.interceptors.request.eject(parseInt(key))
        delete self.reqInterceptorCode[key]
    })
}

/**
 * 删除或清空响应拦截器
 * @param {number} code
 * @returns {void}
 */
function clearResInterceptor (code?: number) {
    // @ts-ignore
    const self = this as IAxios

    if (
        code != null &&
        typeof code === 'number' &&
        self.resInterceptorCode[code]
    ) {
        delete self.resInterceptorCode[code]
        // @ts-ignore
        return self.interceptors.response.eject(code)
    }

    if (self.resInterceptorCode == null) {
        return
    }

    // 遍历删除
    Object.keys(self.resInterceptorCode).forEach(key => {
        self.interceptors.response.eject(parseInt(key))
        delete self.resInterceptorCode[key]
    })
}

/**
 * 创建实例的拦截器
 * @param {AxiosInstance} ins
 * @returns {any}
 */
export function createInterceptor (ins: AxiosInstance): InterceptorObj {
    Object.defineProperties(ins, {
        resInterceptorCode: {
            value: {},
            enumerable: true
        },
        reqInterceptorCode: {
            value: {},
            enumerable: true
        },
        addReqInterceptor: {
            value: addReqInterceptor.bind(ins),
            enumerable: true
        },
        addResInterceptor: {
            value: addResInterceptor.bind(ins),
            enumerable: true
        },
        clearReqInterceptor: {
            value: clearReqInterceptor.bind(ins),
            enumerable: true
        },
        clearResInterceptor: {
            value: clearResInterceptor.bind(ins),
            enumerable: true
        }
    })

    return pick([
        'addReqInterceptor',
        'addResInterceptor',
        'clearReqInterceptor',
        'clearResInterceptor'
    ], ins) as InterceptorObj
}
