import _ from 'lodash'
import { createClient } from 'redis'
import asyncRedis from 'async-redis'
import dotenv from 'dotenv'
dotenv.config({path: `${__dirname}/../../.env`})


const host = process.env.DEV_CACHE_HOST || 'localhost'
const port = process.env.DEV_CACHE_PORT || '6379'

const client = createClient(port, host)
const clientRedis = asyncRedis.createClient(port, host)
const ENABLE_CACHE = process.env.NODE_ENV === 'production' && process.env.ENABLE_CACHE === '1' ? true : false
// const ENABLE_CACHE = 1

export const get = async (key, parse = false) => {
  try {
    if (!ENABLE_CACHE) {
      return false
    }
    return parse ? JSON.parse(await clientRedis.get(key)) : await clientRedis.get(key)
  } catch (error) {
    return false
  }
}

export const set = (key, data, duration=3600, encode = false) => {
  client.setex(key, duration, encode ? JSON.stringify(data) : data)
  // clientRedis.set(key, encode ? JSON.stringify(data) : data)
}

export const remove = (key) => {
  if (!ENABLE_CACHE) {
    return null
  }
  clientRedis.del(key)
}

export const genKey = (key, data = {}) => {
  let str = `${process.env.PREFIX_WEB_CACHE}_unique_user_${key}`
  if (!_.isEmpty(data, true)) {
    str += '_'
    Object.keys(data)
      .sort()
      .forEach(function (v, i) {
        str += `&${v}=${data[v]}`
      });
  }
  return str
}

export const genKeyPublic = (key, data = {}) => {
  let str = `${process.env.PREFIX_WEB_CACHE}_public_unique_user_${key}`
  if (!_.isEmpty(data, true)) {
    str += '_'
    Object.keys(data)
      .sort()
      .forEach(function (v, i) {
        str += `&${v}=${data[v]}`
      });
  }
  return str
}

export const flushByUser = async () => {
  let uniqueUser = `unique_user_`
  client.keys(`*${uniqueUser}*`, function (err, keys) {
    keys.forEach(function (key) {
      client.del(key)
    });
  });
  return true
}

export const flushCache = () => {
  client.flushdb( function (err, succeeded) {
    console.log(succeeded);
  });
}

export const removeKeysByPrefix = (prefix='*') => {
  client.keys(prefix, function (err, keys) {
    if (err) return console.log(err);
    for(var i = 0, len = keys.length; i < len; i++) {
      client.del(keys[i]);
    }
  });
}

export default { get, set, remove, genKey, genKeyPublic, flushCache, flushByUser, removeKeysByPrefix }