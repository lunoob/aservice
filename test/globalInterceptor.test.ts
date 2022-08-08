import {
    createRequest,
    createReqInterceptor,
    createResInterceptor,
    deleteReqInterceptor,
    deleteResInterceptor,
    clearReqInterceptor,
    clearResInterceptor
} from '../esm'

describe('测试全局请求拦截器功能', () => {
    test('测试请求拦截器是否调用', () => {
        clearReqInterceptor()

        let isCall = false
        createReqInterceptor(function globalReq (config) {
            isCall = true
            return config
        })

        const http = createRequest({ baseURL: 'http://baidu.com' })

        return http.request('get')('/')({}).then(() => {
            expect(isCall).toBeTruthy()
        })
    })

    test('测试请求拦截器调用顺序是否正确', () => {
        clearReqInterceptor()

        let str = ''
        createReqInterceptor((config) => {
            str += '1'
            return config
        })

        createReqInterceptor((config) => {
            str += '2'
            return config
        })

        // 先进先出，伪队列的数据结构
        // 默认拦截器在最后，并且不支持取消

        const http = createRequest({ baseURL: 'http://baidu.com' })

        return http.request('get', '/')().then(() => {
            expect(str).toMatch('12')
        })
    })

    test('测试删除请求拦截器', () => {
        clearReqInterceptor()
        let beCalled = false
        const code = createReqInterceptor((config) => {
            beCalled = true
            return config
        })
        deleteReqInterceptor(code)

        const http = createRequest({ baseURL: 'http://baidu.com' })

        return http.request('get', '/')().then(() => {
            expect(beCalled).toBeFalsy()
        })
    })

    test('测试清空请求拦截器', () => {
        let count = 0
        createReqInterceptor((config) => {
            count += 1
            return config
        })

        createReqInterceptor((config) => {
            count += 1
            return config
        })

        clearReqInterceptor()

        const http = createRequest({ baseURL: 'http://baidu.com' })

        return http.request('get', '/')().then(() => {
            expect(count).toBe(0)
        })
    })
})

describe('测试全局响应拦截器功能', () => {
    test('测试响应拦截器是否调用', () => {
        clearResInterceptor()

        let isCall = false

        createResInterceptor(function globalRes (config) {
            isCall = true
            return config
        })

        const http = createRequest({ baseURL: 'http://baidu.com' })

        return http.request('get', '/')().then(() => {
            expect(isCall).toBeTruthy()
        })
    })

    test('测试响应拦截器调用顺序是否正确', () => {
        let count = 0

        createResInterceptor((config) => {
            if (count > 0) {
                count -= 1
            }
            return config
        })
        createResInterceptor((config) => {
            count += 1
            return config
        })

        // 先进先出，伪队列数据结构

        const http = createRequest({ baseURL: 'http://baidu.com' })

        return http.request('get', '/')().then(() => {
            expect(count).toBe(1)
        })
    })

    test('测试删除响应拦截器', () => {
        clearResInterceptor()
        let beCalled = false

        const code = createResInterceptor((config) => {
            beCalled = true
            return config
        })
        deleteResInterceptor(code)

        const http = createRequest({ baseURL: 'http://baidu.com' })

        return http.request('get', '/')().then(() => {
            expect(beCalled).toBeFalsy()
        })
    })

    test('测试清空响应拦截器', () => {
        clearResInterceptor()
        let count = 0

        createResInterceptor((config) => {
            count += 1
            return config
        })
        createResInterceptor((config) => {
            count += 1
            return config
        })

        clearResInterceptor()

        const http = createRequest({ baseURL: 'http://baidu.com' })

        return http.request('get', '/')().then(() => {
            expect(count).toBe(0)
        })
    })
})
