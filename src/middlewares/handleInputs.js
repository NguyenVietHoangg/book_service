import _ from 'lodash'

const handleInputs = async (req, res, next) => {
  // const bodyMod= {}, paramsMod= {}
  // _.map(req.body, (item, index) => {
  //   bodyMod[index] = req.sanitize(item);
  // })
  // _.map(req.params, (item, index) => {
  //   paramsMod[index] = req.sanitize(item)
  // })
  // req.body = bodyMod
  // req.params = paramsMod
  next()
}

export default handleInputs