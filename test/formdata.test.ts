/**
* @fileoverview 测试对 FormData 数据的支持(默认的请求拦截器)
* @author Luoob
*/

import FormData from 'form-data'
import { createRequest, createReqInterceptor } from '../src'
import { isFormData } from '../src/helpers'

describe('测试对 FormData 数据的影响', () => {
    test('正常请求是否有影响', () => {
        let data: any = null
        createReqInterceptor((config) => {
            data = config.data
            // 查看 formdata 格式有没有被破坏
            return config
        })

        const http = createRequest({ baseURL: '/' })

        const fd = new FormData()
        fd.append('file', 'haha')

        return http.request('post', '/api')(fd).then(() => {
            expect(isFormData(data)).toBeTruthy()
        })
    })
})
