/**
* @fileoverview 复制 Object.prototype.toString 函数
* @author Luoob
*/

const toString = Function.prototype.call.bind(Object.prototype.toString)

export default function (data: any) {
    return toString(data).replace(/^\[object\s/g, '').replace(']', '')
}
