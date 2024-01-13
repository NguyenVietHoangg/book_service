const catchHandle = fn => (req, res, next) => {
  fn(req, res, next).catch(err => {
    console.log(`======= catchProcessHandle:${req.originalUrl}`, err)
    return res.render(`${res.locals.layoutPath}/500`)
  });
}

export default catchHandle