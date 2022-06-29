/**
* @fileoverview Instanace Types
* @author Luoob
*/

import { AxiosInstance } from 'axios'
import { RequestInterceptor, ResponseInterceptor } from './interceptor'

type MethodType = 'request' | 'response'
type ReqInstanceInterceptor = { reqInterceptorCode: Record<number | string, boolean> }
type ResInstanceInterceptor = { resInterceptorCode: Record<number | string, boolean> }
type InstanceUniqueCode = { iCode: number | string }
type InstaceKeyCodeMap = { iKeyCode: Record<MethodType, Record<number | string, number | string>> }

export type InterceptorObj = {
    addReqInterceptor: RequestInterceptor
    addResInterceptor: ResponseInterceptor
    clearReqInterceptor: (code?: number) => void
    clearResInterceptor: (code?: number) => void
}

export type IAxios =
    AxiosInstance &
    ReqInstanceInterceptor &
    ResInstanceInterceptor &
    InstanceUniqueCode &
    InterceptorObj &
    InstaceKeyCodeMap
