/**
* @fileoverview 全局响应处理器测试
* @author Luoob
*/

import {
    createRequest,
    createSuccessHandler,
    createErrorHandler,
    deleteSuccessHandler,
    errorLogHandler,
    clearErrorHandler,
    clearSuccessHandler,
    deleteErrorHandler
} from '../esm'
import { IResponse } from '../esm/types/create'

function toEqualResponse (response: IResponse) {
    expect(Object.keys(response)).toEqual(['status', 'message', 'data'])
}

describe('测试全局响应处理器的功能', () => {
    test('创建成功处理器', () => {
        let beCalled = false
        createSuccessHandler((res) => {
            beCalled = true
            return res
        })

        const http = createRequest({ baseURL: 'http://baidu.com' })
        return http.request('get', '/')().then((res) => {
            expect(beCalled).toBeTruthy()
            expect(Object.keys(res)).toEqual(['status', 'message', 'data'])
        })
    })

    test('创建失败处理器', () => {
        let beCalled = false
        const fn = jest.fn()
        createErrorHandler((res) => {
            beCalled = true
            return res
        })

        createErrorHandler(errorLogHandler({
            log: false,
            callback: fn
        }))

        const http = createRequest({ baseURL: '/' })
        return http.request('get', '/')({}).then((res) => {
            expect(beCalled).toBeTruthy()
            expect(fn).toBeCalled()
            expect(Object.keys(res)).toEqual(['status', 'message', 'data'])
        })
    })

    test('清除成功处理器', () => {
        clearSuccessHandler()

        let beCalled = false

        const code = createSuccessHandler((res) => {
            beCalled = true
            return res
        })
        deleteSuccessHandler(code)

        const http = createRequest({ baseURL: 'http://baidu.com' })
        return http.request('get', '/')({}).then((res) => {
            expect(beCalled).toBeFalsy()
            expect(Object.keys(res)).toEqual(['status', 'message', 'data'])
        })
    })

    test('清除失败处理器', () => {
        clearErrorHandler()

        let beCalled = false

        const code = createErrorHandler((res) => {
            beCalled = true
            return res
        })
        deleteErrorHandler(code)

        const http = createRequest({ baseURL: '/' })
        return http.request('get', '/')({}).then((res) => {
            expect(beCalled).toBeFalsy()
            expect(Object.keys(res)).toEqual(['status', 'message', 'data'])
        })
    })

    test('清除全局成功处理器, 保留默认', () => {
        createSuccessHandler((response) => {
            response.status = 900
            return response
        })

        clearSuccessHandler()

        const http = createRequest({ baseURL: 'http://baidu.com' })
        return http.request('get', '/')().then((response) => {
            expect(response.status).toBe(200)
            toEqualResponse(response)
        })
    })

    test('清除全局失败处理器，保留默认', () => {
        createErrorHandler((error) => {
            error.status = '900'
            return error
        })

        clearErrorHandler()

        const http = createRequest({ baseURL: '/' })
        return http.request('get', '/')().then((result) => {
            expect(result.status).toBe(-1)
            toEqualResponse(result)
        })
    })

    test('清除全局成功处理器(包括默认处理器)', () => {
        createSuccessHandler((response) => {
            response.status = 900
            return response
        })

        clearSuccessHandler()

        const http = createRequest({ baseURL: 'http://baidu.com', useDefaultSuccessHandler: false })
        return http.request('get', '/')().then((response) => {
            expect(response).toHaveProperty(['config', 'headers'])
        })
    })

    test('清除全局失败处理器(包括默认处理器)', () => {
        createErrorHandler((error) => {
            error.status = '900'
            return error
        })

        clearErrorHandler()

        const http = createRequest({ baseURL: '/', useDefaultErrorHandler: false })
        return http.request('get', '/')().then((error) => {
            expect(error).not.toHaveProperty('data')
        })
    })

    // 全局注册处理器 -> 默认处理器
    test('成功处理器执行顺序', () => {
        clearSuccessHandler()

        const status = 204
        createSuccessHandler((res) => {
            res.status = status
            return res
        })

        const http = createRequest({ baseURL: 'http://baidu.com' })
        return http.request('get', '/')().then((response) => {
            expect(response.status).toBe(status)
            expect(Object.keys(response)).toEqual(['status', 'message', 'data'])
        })
    })

    // 全局注册处理器 -> 默认处理器
    test('失败处理器执行顺序', () => {
        clearErrorHandler()

        const status = '101'
        createErrorHandler((err) => {
            err.status = status
            return err
        })

        const http = createRequest({ baseURL: '/' })
        return http.request('get', '/')().then((response) => {
            expect(response.status).toMatch(status)
            expect(Object.keys(response)).toEqual(['status', 'message', 'data'])
        })
    })
})
