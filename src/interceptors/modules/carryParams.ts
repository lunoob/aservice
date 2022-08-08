/**
* @fileoverview 对请求增加额外数据的拦截器
* @author Luoob
*/

import { IAxiosRequestConfig } from '../../types/create'
import { isFormData, isFunction, isPlainObject } from '../../helpers/index.js'

/**
 * 请求拦截器, 创建添加额外的参数
 * @param {any} params 参数对象
 * @returns {(IAxiosRequestConfig) => IAxiosRequestConfig}
 */
function carryParamsInterceptor (data: any) {
    const fn = isFunction(data) ? data : () => data

    return (config: IAxiosRequestConfig) => {
        const useBody = ['post', 'put'].includes(config.method!.toLocaleLowerCase())

        let params = useBody ? config.data : config.params

        // 判断如果是 formData，则不做任何动作
        if (isFormData(params)) {
            return config
        }

        if (!isPlainObject(params)) {
            return config
        }

        params = {
            ...fn(),
            ...params
        }

        return Object.assign(config, {
            data: useBody ? params : undefined,
            params: useBody ? undefined : params
        })
    }
}

export default carryParamsInterceptor
