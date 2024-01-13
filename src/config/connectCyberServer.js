import axios from 'axios'
import { merge } from 'lodash'
import * as eResponse from './eResponse'
import { encodeQueryData, isEmptyObject } from '../utils/common'

const TIMEOUT = 20000
const CYBER_AUTH_KEY = '573F2B33-BB3E-44D2-A0A7-04832364F974'

const cyberAPI = axios.create({
  baseURL: ((process.env.CYBER_ENDPOINT != null) ? process.env.CYBER_ENDPOINT : 'http://118.70.13.23:6868/api/CyberAPI'),
  headers: { 
    'Content-Type': 'application/json',
    'Authorization': CYBER_AUTH_KEY
  },
  timeout: TIMEOUT
})

const getConfig = (config) => {
  return merge(config, {})
}

export const get = async (path, data = {}, config = {}) => {
  try {
    const encode = (typeof (data) === 'object' && !isEmptyObject(data)) ? '?' + encodeQueryData(data) : ''
    path = path + encode
    const res = await cyberAPI.get(path, getConfig(config))

    if (typeof res.data !== "object") {
      return eResponse._errorResquestNotFound(url);
    }

    return res.data
  } catch (err) {

    return eResponse._errorOnTryCatch(err)
  }
}

export const post = async (path, data = {}, config = {}) => {
  try {
    const res = await cyberAPI.post(path, data, getConfig(config))
    if (typeof res.data !== "object") {
      return eResponse._errorResquestNotFound(url);
    }

    return res.data
  } catch (err) {

    console.log('catch api POST: ', err)
    return eResponse._errorOnTryCatch(err)
  }
}

export const put = async (path, data = {}, config = {}) => {
  try {
    const res = await cyberAPI.put(path, data, getConfig(config))
    if (typeof res.data !== "object") {
      return eResponse._errorResquestNotFound(url);
    }

    return res.data
  } catch (err) {

    console.log('catch api PUT: ', err)
    return eResponse._errorOnTryCatch(err)
  }
}

export const deleted = async (path, data = {}, config = {}) => {
  try {
    const newConfig = getConfig(config)
    const newData = {...newConfig, ...{data: data}}
    const res = await cyberAPI.delete(path, newData)
    if (typeof res.data !== "object") {
      return eResponse._errorResquestNotFound(url);
    }
    return res.data
  } catch (err) {
    console.log('catch api DELETE: ', err)
    return eResponse._errorOnTryCatch(err)
  }
}

export default { get, post, put, deleted }