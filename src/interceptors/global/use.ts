/**
* @fileoverview 为 axios 实例注册拦截器
* @author Luoob
*/

import { addInstance } from './action'
import { IAxios } from '../../types/instance'
import { AxiosInstance } from 'axios'

/**
 * 对 axios 实例注册拦截器
 * @param {AxiosInstance} instance axios 实例
 * @returns {void}
 */
export function useInterceptors (instance: AxiosInstance) {
    /**
     * 1. 收集 axios 实例
     * 2. 注册现有的拦截器
     * 3. 注册请求拦截器
     * 4. 注册相应拦截器
    */
    addInstance(instance as IAxios)
}
