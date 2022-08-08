/**
* @fileoverview 判断是否字面量对象数据类型
* @author Luoob
*/

import tostring from './toString.js'
import isObjectLike from './isObjectLike.js'

/**
 * 检测数据类型是否字面量对象
 * @param {any} data 要检验的数据
 * @returns {boolean}
 */
function isPlainObject (value: any) {
    if (!isObjectLike(value) || tostring(value) !== 'Object') {
        return false
    }
    if (Object.getPrototypeOf(value) === null) {
        return true
    }
    let proto = value
    while (Object.getPrototypeOf(proto) !== null) {
        proto = Object.getPrototypeOf(proto)
    }
    return Object.getPrototypeOf(value) === proto
}

export default isPlainObject
