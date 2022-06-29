/**
* @fileoverview 测试动态参数功能(默认的请求拦截器)
* @author Luoob
*/

import FormData from 'form-data'
import { createRequest, createReqInterceptor } from '../src'

describe('测试动态参数功能', () => {
    test('测试 path 参数是否被替换', () => {
        let url = ''
        createReqInterceptor((config) => {
            url = config.url!
            return config
        })

        const http = createRequest({ baseURL: '/' })

        const params = { name: 'luoob', _id: '123' }
        return http.request('get', '/article/:id')(params)
            .then(() => {
                expect(url).toMatch('/article/123')
            })
    })

    test('测试使用 dynamic 配置', () => {
        let url = ''

        createReqInterceptor((config) => {
            url = config.url!
            return config
        })

        const http = createRequest({ baseURL: '/' })
        return http.request('get', '/article/:id')('', { dynamic: { _id: '123' } })
            .then(() => {
                expect(url).toMatch('/article/123')
            })
    })

    // dynamic 优先级高于 params
    test('测试 dynamic 和 params 优先级', () => {
        const http = createRequest({ baseURL: '/' })
        let url = ''
        http.addReqInterceptor((config) => {
            url = config.url
            return config
        })

        const params = { _id: '456' }
        const config = { dynamic: { _id: '789' } }
        return http.request('get', '/article/:id')(params, config)
            .then(() => {
                expect(url).toMatch('/article/789')
            })
    })

    test('测试 FormData + 动态参数', () => {
        const http = createRequest({ baseURL: '/' })
        let url = ''
        http.addReqInterceptor(function getUrl (config) {
            url = config.url
            return config
        })

        const fd = new FormData()
        fd.append('name', 'luoob')
        fd.append('age', 18)

        return http.request('get', '/article/:type/:id')(fd, {
            dynamic: {
                _type: 'music',
                _id: 1234
            }
        }).then(() => {
            expect(url).toMatch('/article/music/1234')
        })
    })
})
