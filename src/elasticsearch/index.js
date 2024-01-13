import { Client } from '@elastic/elasticsearch'

const init = new Client({
  node: process.env.ELASTICSEARCH_HOST || 'http://localhost:9200'
})

export const get = async (data) => {
  try {
    console.log('data.query', data.query)
    const config = {index: data.index} 
    if (data.query) {
      config.body = {
        query: data.query
      }
    }
    const result = await init.search(config)
    return result.body.hits.hits
  } catch (error) {
    console.log('error elasticsearch on get', error)
    return []
  }
}

export const set = async (data={}) => {
  try {
    await init.index({
      index: data.index,
      body: data.body
    })
    await init.indices.refresh({ index: data.index })
  } catch (error) {
    console.log('error elasticsearch on set', error)
    return null
  }
}

export const destroy = async () => {
  try {
    
  } catch (error) {
    console.log('error elasticsearch on destroy', error)
    return null
  }
}