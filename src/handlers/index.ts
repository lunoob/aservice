import { defaultErrorHandler, defaultSuccessHandler } from './modules/default'
import { errorLogHandler } from './modules/errorLog'
import { createHandler } from './instance'
import {
    createError,
    createSuccess,
    deleteError,
    deleteSuccess,
    clearError,
    clearSuccess
} from './global/action'
import { useErrorHandler, useSuccessHandler } from './global/use'

export {
    errorLogHandler,
    defaultSuccessHandler,
    defaultErrorHandler,
    createHandler,
    createError,
    createSuccess,
    deleteError,
    deleteSuccess,
    clearError,
    clearSuccess,
    useErrorHandler,
    useSuccessHandler
}
