export const timeLog = (req, res, next) => {
  console.log('===> Time: ', new Date().toLocaleString())
  next()
}