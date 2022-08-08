/**
* @fileoverview 测试携带额外参数拦截器（请求拦截器）
* @author Luoob
*/

import { createRequest, createReqInterceptor, carryParamsInterceptor } from '../esm'

describe('测试携带参数功能', () => {
    test('携带参数是否正确', () => {
        let params: any = {}

        createReqInterceptor(carryParamsInterceptor({
            name: 'luoob',
            age: '18'
        }))

        createReqInterceptor(carryParamsInterceptor(() => {
            return {
                dynamic: 1
            }
        }))

        createReqInterceptor((config) => {
            params = config.params
            return config
        })

        const http = createRequest({ baseURL: '/' })

        return http.request('get')('/1')({}).then(() => {
            expect(params).toMatchSnapshot()
        })
    })
})
