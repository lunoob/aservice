/**
* @fileoverview 测试实例的处理器
* @author Luoob
*/

import { createRequest, createSuccessHandler, deleteSuccessHandler } from '../esm'
import { IResponse } from '../esm/types/create'

let http = createRequest({ baseURL: '/' })

function toEqualResponse (response: IResponse) {
    expect(Object.keys(response)).toEqual(['status', 'message', 'data'])
}

describe('测试实例的成功响应处理器', () => {
    test('测试添加成功响应处理器', () => {
        let beCalled = false

        http = createRequest({ baseURL: 'http://baidu.com' })
        http.addSuccessHandler((config) => {
            beCalled = true
            return config
        })

        return http.request('get', '/')().then((res) => {
            expect(beCalled).toBeTruthy()
            expect(Object.keys(res)).toEqual(['status', 'message', 'data'])
        })
    })

    test('不使用默认的成功处理函数', () => {
        let beCalled = false

        http = createRequest({ baseURL: 'http://baidu.com', useDefaultSuccessHandler: false })

        http.addSuccessHandler((config) => {
            beCalled = true
            return config
        })

        return http.request('get', '/')().then((res) => {
            expect(beCalled).toBeTruthy()
            expect(Object.keys(res)).not.toEqual(['status', 'message', 'data'])
        })
    })

    test('测试多个实例之间独立不影响', async () => {
        http = createRequest({ baseURL: 'http://baidu.com', useDefaultSuccessHandler: false })
        const http2 = createRequest({ baseURL: 'http://baidu.com' })

        const [httpRes, http2Res] = await Promise.all([
            http.request('get', '/')(),
            http2.request('get', '/')()
        ])

        expect(Object.keys(httpRes)).not.toEqual(['status', 'message', 'data'])
        toEqualResponse(http2Res as IResponse)
    })

    test('测试删除处理函数', () => {
        let remove = true
        http = createRequest({ baseURL: 'http://baidu.com' })

        const code = http.addSuccessHandler((config) => {
            remove = false
            return config
        })
        http.clearSuccessHandler(code)

        return http.request('get', '/')().then((response) => {
            expect(remove).toBeTruthy()
            toEqualResponse(response)
        })
    })

    test('测试清空全部的处理函数', () => {
        let count = 0

        http = createRequest({ baseURL: 'http://baidu.com' })

        http.addSuccessHandler((config) => {
            count += 1
            return config
        })
        http.addSuccessHandler((config) => {
            count += 1
            return config
        })

        http.clearSuccessHandler()

        return http.request('get', '/')().then((response) => {
            expect(count).toBe(0)
            toEqualResponse(response)
        })
    })

    test('测试处理器的执行顺序', () => {
        // 正确应该是：实例身上的响应处理器先执行，然后再到全局的
        const message = 'test run order'

        const code = createSuccessHandler((response) => {
            return Object.assign(response, { data: { message: 'global' } })
        })

        http = createRequest({ baseURL: 'http://baidu.com' })

        http.addSuccessHandler((response) => {
            return Object.assign(response, { data: { message } })
        })

        return http.request('get', '/')().then((res) => {
            expect(res.message).toMatch('global')
            deleteSuccessHandler(code)
        })
    })
})

describe('测试实例的失败响应处理器', () => {
    test('测试添加失败响应处理器', () => {
        let beCalled = false

        http = createRequest({ baseURL: '/' })

        http.addErrorHandler((config) => {
            beCalled = true
            return config
        })

        return http.request('get', '/')().then((res) => {
            expect(beCalled).toBeTruthy()
            expect(res.status).toBe(-1)
        })
    })

    test('不使用默认的失败处理函数', () => {
        let beCalled = false
        http = createRequest({ baseURL: '/', useDefaultErrorHandler: false })

        http.addErrorHandler((config) => {
            beCalled = true
            return config
        })

        return http.request('get', '/')().then((res) => {
            expect(beCalled).toBeTruthy()
            expect(Object.keys(res)).not.toBe(-1)
        })
    })

    test('测试多个实例之间独立不影响', async () => {
        http = createRequest({ baseURL: '/', useDefaultErrorHandler: false })
        const http2 = createRequest({ baseURL: '/' })

        http.addErrorHandler((error) => {
            error.status = '100'
            return error
        })

        const [httpRes, http2Res] = await Promise.all([
            http.request('get', '/')(),
            http2.request('get', '/')()
        ])

        // @ts-ignore
        expect(httpRes.status).toMatch('100')
        // @ts-ignore
        expect(http2Res.status).toBe(-1)
    })

    test('测试处理函数的执行顺序', () => {
        let type = ''
        // 正确应该是：实例身上的响应处理器先执行，然后再到全局的

        http = createRequest({ baseURL: '/' })
        http.addErrorHandler((config) => {
            type = config.name
            return config
        })

        return http.request('get', '/')().then((response) => {
            expect(type).toMatch('Error')
            toEqualResponse(response)
        })
    })

    test('测试删除处理函数', () => {
        let remove = true

        http = createRequest({ baseURL: '/' })

        const code = http.addErrorHandler((config) => {
            remove = false
            return config
        })
        http.clearErrorHandler(code)

        return http.request('get', '/')().then((response) => {
            expect(remove).toBeTruthy()
            toEqualResponse(response)
        })
    })

    test('测试清空全部的处理函数', () => {
        let count = 0

        http = createRequest({ baseURL: '/' })
        http.addErrorHandler((config) => {
            count += 1
            return config
        })
        http.addErrorHandler((config) => {
            count += 1
            return config
        })

        http.clearErrorHandler()

        return http.request('get', '/')().then((res) => {
            expect(count).toBe(0)
            expect(res.status).toBe(-1)
        })
    })
})
