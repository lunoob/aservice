/**
* @fileoverview 失败，错误打印处理器
* @author Luoob
*/

import { AxiosError } from 'axios'

type Option = {
    log: boolean
    callback?: () => void
}

/**
 * 打印错误信息的处理器
 * @param {Option} Option
 * @returns {ErrorHandler}
 */
export function errorLogHandler (option: Option = { log: true }) {
    if (option.callback != null && typeof option.callback === 'function') {
        option.callback()
    }
    return (err: AxiosError) => {
        const url = err.config.url
        const message = err.message
        if (option.log) {
            console.error(
                `api#${err.status || ''} ${url} - ${message}`
            )
        }
        return err
    }
}
