import request from './request'

// 注册
export const RegisterApi = (params) => request.post('/register', params)