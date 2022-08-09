/**
* @fileoverview 拦截器统一导出文件
* @author Luoob
*/

import carryParamsInterceptor from './modules/carryParams'

export * from './global/action'
export * from './global/use'
export * from './instance'

export {
    carryParamsInterceptor
}
