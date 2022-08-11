import {storage} from "../../lib/storage";
import axios, {AxiosResponse} from "axios";
import * as Device from 'expo-device'

export enum token {
    refresh = 'refresh_token',
    access = 'access_token'
}

export const baseUrl = function () {
    const hostIndex = 1
    let hosts = [
        'https://api.2say.su/',
        'http://127.0.0.1:8000/',
    ]

    try {
        if (Device.modelName === 'Android SDK built for x86') hosts[1] = 'http://10.0.2.2:8000/'
    } catch (e) {
    }

    return hosts[hostIndex]
}()

async function simpleRequest(url, method, headers, body, reAuth = false) {
    url = baseUrl + url
    try {
        if (method === 'get') return await axios.get(url, {headers})
        if (method === 'delete') return await axios.delete(url, {headers})
        return await axios[method](url, body, {headers})
    } catch (e) {
        if (reAuth && e.response.status === 401) {
            return e.response
        }
        if (!e.response.status) {
            throw 503
        }
        throw e.response.status
    }
}

async function requestWithReAuth(url, methods, headers, body) {
    let response = await simpleRequest(url, methods, headers, body, true)
    if (response.status === 401) {
        const refresh = await storage.get(token.refresh, false)

        if (!refresh) throw 401
        headers.Authorization = ''
        response = await simpleRequest('refresh_token/', 'post', headers, {refresh})

        if (response.status === 200) {
            await storage.set(token.refresh, response.data['refresh'], false)
            await storage.set(token.access, response.data['access'], false)
            headers.Authorization = 'JWT ' + response.data['access']
            response = await simpleRequest(url, methods, headers, body)
        } else throw 401
    }
    return response
}

export interface IApiError {
    error: { message: string }
}


async function request(url: string, method: string, body: object, useJWT: boolean) {
    url = url.toLowerCase()
    if (method === 'get') url += bodyToString(body)
    const headers = await getHeaders(useJWT)
    if (useJWT) return await requestWithReAuth(url, method, headers, body)
    return await simpleRequest(url, method, headers, body)
}

async function getHeaders(useJWT) {
    const headers = {
        Authorization: '',
        'Content-Type': 'application/json;charset=UTF-8',
        Accept: 'application/json'
    }
    if (useJWT) {
        const access = await storage.get(token.access, false)
        headers.Authorization = 'JWT ' + access
    }
    return headers
}

function bodyToString(body) {
    let url = ''
    if (body) {
        url += '?'
        const array = []
        for (let key in body) array.push(`${key}=${body[key]}`)
        url += array.join('&')
    }
    return url
}

export async function GET<T = any, R = AxiosResponse<T>, D = any>
(url: string, body: object | null = null, useJWT: boolean = true): Promise<R> {
    return await request(url, 'get', body, useJWT)
}

export async function PATCH<T = any, R = AxiosResponse<T>, D = any>
(url: string, body: object, useJWT: boolean = true): Promise<R> {
    return await request(url, 'patch', body, useJWT)
}

export async function POST<T = any, R = AxiosResponse<T>, D = any>
(url: string, body: object, useJWT: boolean = true): Promise<R> {
    return await request(url, 'post', body, useJWT)
}

export const DELETE = async (url: string, useJWT: boolean = true) => {
    return await request(url, 'delete', null, useJWT)
}
