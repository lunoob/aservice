/**
* @fileoverview 拦截器统一导出文件
* @author Luoob
*/

import carryParamsInterceptor from './modules/carryParams'
import {
    addInstance,
    createRequest,
    createResponse,
    deleteRequest,
    deleteResponse,
    clearRequest,
    clearResponse
} from './global/action'
import { useInterceptors } from './global/use'
import { createInterceptor } from './instance'

export {
    carryParamsInterceptor,
    useInterceptors,
    createInterceptor,
    addInstance,
    createRequest,
    createResponse,
    deleteRequest,
    deleteResponse,
    clearRequest,
    clearResponse
}
