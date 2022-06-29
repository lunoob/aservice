/**
* @fileoverview 当前环境是否为 Nodejs 环境
* @author Luoob
*/

function isInNode () {
    return window == null && !!global && !!process
}

export default isInNode
