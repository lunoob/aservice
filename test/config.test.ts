/**
* @fileoverview 测试配置
* @author Luoob
*/

import { createRequest } from '../src'

describe('测试配置', () => {
    test('测试配置覆盖前面的参数', () => {
        const http = createRequest({ baseURL: '/' })

        let url = ''
        http.addReqInterceptor((config) => {
            url = config.baseURL + config.url
            return config
        })

        return http.request('get', '/hello')('', {
            url: '/hahaha',
            baseURL: 'http://baidu.com'
        }).then(() => {
            expect(url).toMatch('http://baidu.com/hahah')
        })
    })
})
