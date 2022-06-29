/**
* @fileoverview 对请求增加动态 path 功能的拦截器
* @author Luoob
*/

import { IAxiosRequestConfig, Dynamic } from '../../types/create'
import { isFormData, isPlainObject, getType } from '../../helpers'

/**
 * 获取动态参数对应的值
 * @param {Dynamic} dataObj
 * @param {string} key
 * @returns {any}
 */
function getDynamicValue (dataObj: Dynamic = {}, key: string) {
    // 判断是否字面量对象
    if (!isPlainObject(dataObj)) {
        throw new TypeError(`expect a plain object, but get ${getType(dataObj)}`)
    }

    return dataObj[key]
}

/**
 * 请求拦截器, 增加动态 path 的功能
 * @param {IAxiosRequestConfig} config 请求配置
 * @returns {IAxiosRequestConfig}
 */
function dynamicInterceptor (config: IAxiosRequestConfig) {
    const { data, params, method } = config

    // 是否是 FormData 数据
    const isfd = isFormData(data || params)

    const isUseData = ['post', 'put'].includes(method!.toLocaleLowerCase())
    const recordName = isUseData ? 'data' : 'params'
    let recordValue: any = null

    if (isfd) {
        recordValue = data || params
    } else {
        recordValue = isUseData ? { ...data } : { ...params }
    }

    let urls: string[] = []
    // 是否使用动态参数
    let useDynamic = false

    // 检验是否符合动态参数的格式 => :id/:name/:age
    const isDynamic = (field: string) => /^:\w+/.test(field)

    if (config.url) {
        urls = config.url.split('/')
        useDynamic = urls.filter(isDynamic).length > 0
    }

    // 是否使用动态参数
    if (useDynamic) {
        urls = urls.map(field => {
            let cField = field
            if (!isDynamic(field)) {
                return cField
            }

            const fieldname = field.replace(':', '')
            const key = `_${fieldname}`

            // FormData 需要配合 config.dynamic
            // 普通请求可以写在 data 或者 params 上，也可以写在 config.dynamic 中

            if (isfd) {
                cField = getDynamicValue(config.dynamic, key) || cField
            } else {
                cField = getDynamicValue(config.dynamic || recordValue, key) || cField
            }

            return cField
        })

        if (config.dynamic != null) {
            // @ts-ignore
            delete config.dynamic
        }
    }

    return Object.assign(config, {
        [recordName]: recordValue,
        url: urls.join('/')
    })
}

export default dynamicInterceptor
