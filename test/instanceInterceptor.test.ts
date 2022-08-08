/**
* @fileoverview 测试实例的拦截器
* @author Luoob
*/

import { createRequest } from '../esm'

let http = createRequest({ baseURL: '/' })

describe('测试实例的拦截器方法', () => {
    describe('请求拦截器', () => {
        beforeEach(() => {
            http = createRequest({ baseURL: '/' })
        })

        test('测试增加请求拦截器', () => {
            let beCalled = false
            http.addReqInterceptor((config) => {
                beCalled = true
                return config
            })

            return http.request('get', '/')().then(() => {
                expect(beCalled).toBeTruthy()
            })
        })

        test('测试删除请求拦截器', () => {
            let beCalled01 = false
            let beCalled02 = false
            const code = http.addReqInterceptor((config) => {
                beCalled01 = true
                return config
            })

            http.addReqInterceptor((config) => {
                beCalled02 = true
                return config
            })

            http.clearReqInterceptor(code)

            return http.request('get', '/')().then(() => {
                expect(beCalled01).toBeFalsy()
                expect(beCalled02).toBeTruthy()
            })
        })

        test('测试清除请求拦截器', () => {
            let beCalled = false
            http.addReqInterceptor((config) => {
                beCalled = true
                return config
            })

            http.clearReqInterceptor()

            return http.request('get', '/')().then(() => {
                expect(beCalled).toBeFalsy()
            })
        })

        test('测试请求拦截器执行顺序', () => {
            let run = ''

            http.addReqInterceptor((config) => {
                run += '1'
                return config
            })

            http.addReqInterceptor((config) => {
                run += '2'
                return config
            })

            http.addReqInterceptor((config) => {
                run += '3'
                return config
            })

            return http.request('get', '/')().then(() => {
                expect(run).toMatch('123')
            })
        })
    })

    describe('响应拦截器', () => {
        beforeEach(() => {
            http = createRequest({ baseURL: 'http://baidu.com' })
        })

        test('测试增加响应拦截器', () => {
            let beCalled = false
            http.addResInterceptor((config) => {
                beCalled = true
                return config
            })

            return http.request('get', '/')().then(res => {
                expect(beCalled).toBeTruthy()
                expect(Object.keys(res)).toEqual(['status', 'message', 'data'])
            })
        })

        test('测试删除响应拦截器', () => {
            let beCalled01 = false
            let beCalled02 = false

            const code = http.addResInterceptor((config) => {
                beCalled01 = true
                return config
            })

            http.addResInterceptor((config) => {
                beCalled02 = true
                return config
            })

            http.clearResInterceptor(code)

            return http.request('get', '/')().then(() => {
                expect(beCalled01).toBeFalsy()
                expect(beCalled02).toBeTruthy()
            })
        })

        test('测试清除所有的响应拦截器', () => {
            let beCalled = false
            http.addResInterceptor((config) => {
                beCalled = true
                return config
            })

            http.clearResInterceptor()

            return http.request('get', '/')().then(() => {
                expect(beCalled).toBeFalsy()
            })
        })

        test('测试响应拦截器执行顺序', () => {
            let run = ''

            http.addResInterceptor((config) => {
                run += '1'
                return config
            })

            http.addResInterceptor((config) => {
                run += '2'
                return config
            })

            http.addResInterceptor((config) => {
                run += '3'
                return config
            })

            return http.request('get', '/')().then(() => {
                expect(run).toMatch('123')
            })
        })
    })
})
