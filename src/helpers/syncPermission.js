import _ from 'lodash'
import * as dbz from './../adapters/fetchData'
import * as Model from './../database/models'
const table = 'permission'
const routePublic = []
export const syncPermissions = async (arrays = []) => {
  try {
    if (arrays.length === 0) {
      return
    }
    let arraysInsert = []

    for (let iArr = 0; iArr < arrays.length; iArr++) {
      if (routePublic.includes(arrays[iArr].path)) {
        continue
      }
      
      if (arrays[iArr].path === '/' || !(arrays[iArr].path).includes('/admin/')) {
        continue
      }
     
      for(let iMt = 0; iMt < arrays[iArr].methods.length; iMt++) {
        const existRoute = await dbz.fetchOne(table, 
          {
            where: {
              route: arrays[iArr].path,
              method: arrays[iArr].methods[iMt]
            }
          })
        if (!existRoute || existRoute.length === 0) {
          const item = {
            name: arrays[iArr].path,
            route: arrays[iArr].path,
            method: arrays[iArr].methods[iMt]
          }
          arraysInsert.push(item)
        }
      }
    }
    console.log(arraysInsert)


    if (arraysInsert.length) {
      try {
        Model.permission.bulkCreate(arraysInsert, { ignoreDuplicates: true })
        console.log('=== import permission success')
      } catch (error) {
        console.log('=== catch error save syncPermission', error.message)
      }
    }
  } catch (error) {
    console.log('=== syncPermission', error)
  }
}