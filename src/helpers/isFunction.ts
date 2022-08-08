/**
* @fileoverview 判断是否 Function 数据类型
* @author Luoob
*/

import tostring from './toString.js'

/**
 * 检测数据类型是否 Function
 * @param {any} fn 要检验的数据
 * @returns {boolean}
 */
function isFunction (data: any) {
    return tostring(data) === 'Function'
}

export default isFunction
