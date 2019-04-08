exports.empty = function empty(res, message) {
  res.status(203).json({"message":message})
}
exports.success = function success(res,message){
 return res.status(200).json({"meta":message,"status":"success"})
}
exports.created = function created(res, message) {
  return res.status(201).json({
    "meta": message
  })
}
exports.exists = function exists(res, message) {
  return res.status(409).json({
    "meta":message,
  })
}
exports.failed = function failed(res,message){
  return res.status(401).json({
    "message": message
  });
}
exports.invalid = function invalid(res,errors){
  return res.status(422).json({
    "errors": errors.array()
  });
}