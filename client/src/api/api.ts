import axios, { AxiosRequestConfig } from 'axios'
import { Todo } from '../types/types'

const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com', // TODO
  headers: { 'Content-Type': 'application/json' },
  responseType: 'json'
})


export function apiGet<T extends keyof GET>(path: T, config?: AxiosRequestConfig) {
  return axiosInstance.get<GET[T]['res']>(path, config)
}

export function apiPost<T extends keyof POST>(
  path: T,
  data?: POST[T]['req']['body'],
  config?: AxiosRequestConfig
) {
  return axiosInstance.post<POST[T]['res']>(path, data, config)
}

export interface GET {
  '/todos': {
    res: Array<Todo>
  }
}

export interface POST {
}
