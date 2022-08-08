// 全局拦截器
import {
    carryParamsInterceptor,
    createRequest as createReqInterceptor,
    createResponse as createResInterceptor,
    deleteRequest as deleteReqInterceptor,
    deleteResponse as deleteResInterceptor,
    clearRequest as clearReqInterceptor,
    clearResponse as clearResInterceptor
} from './interceptors'

// 全局响应处理器
import {
    createSuccess as createSuccessHandler,
    createError as createErrorHandler,
    deleteSuccess as deleteSuccessHandler,
    deleteError as deleteErrorHandler,
    clearSuccess as clearSuccessHandler,
    clearError as clearErrorHandler,
    errorLogHandler,
    defaultErrorHandler,
    defaultSuccessHandler
} from './handlers'

export * from './create'

export {
    createSuccessHandler,
    createErrorHandler,
    deleteSuccessHandler,
    deleteErrorHandler,
    clearSuccessHandler,
    clearErrorHandler,
    errorLogHandler,
    defaultErrorHandler,
    defaultSuccessHandler
}

export {
    carryParamsInterceptor,
    createReqInterceptor,
    createResInterceptor,
    deleteReqInterceptor,
    deleteResInterceptor,
    clearReqInterceptor,
    clearResInterceptor
}
