/**
* @fileoverview Handler Types
* @author Luoob
*/

import { AxiosError, AxiosResponse } from 'axios'

export type ResponseData = {
    status: number | string
    message: string
    data: any
}

export interface SuccessHandler {
    (response: AxiosResponse): any | AxiosResponse
}

export interface ErrorHandler {
    (error: AxiosError): AxiosError | any
}
