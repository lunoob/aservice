/**
* @fileoverview 反转请求拦截器顺序
* @author Luoob
*/

import dynamicInterceptor from '../interceptors/modules/dynamic.js'

function reverseRequest (handlers: any[]) {
    const defaultList = [dynamicInterceptor]
    const cloneHandlers = handlers.slice()
    const defaultHandlers = cloneHandlers.filter((n, idx, arr) => {
        if (n == null) {
            return !!n
        }
        const isContain = defaultList.includes(n.fulfilled)
        if (isContain) {
            arr[idx] = null
        }
        return isContain
    })
    const customHandlers = cloneHandlers.filter(Boolean)

    return [
        ...customHandlers.reverse(),
        ...defaultHandlers
    ]
}

export default reverseRequest
