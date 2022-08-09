/**
* @fileoverview 判断是否 formData 数据类型
* @author Luoob
*/

import tostring from './toString'
import FormData from 'form-data'

/**
 * 检测数据类型是否 FormData
 * @param {any} data 要检验的数据
 * @returns {boolean}
 */
function isFormData (data: any) {
    return tostring(data) === 'FormData' || data instanceof FormData
}

export default isFormData
