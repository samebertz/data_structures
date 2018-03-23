/***/ const Body = require('./primitives/body')
/***/ const Face = require('./primitives/face')
/***/ const Edge = require('./primitives/edge')
/***/ const Vertex = require('./primitives/vertex')

function MKB() {
  return new Body
}
function make_component(B, C) {
  const c = new C
  c.id = B[C.name.toLowerCase()+'s'].length
  B[C.name.toLowerCase()+'s'].insert(c)
  return c
}
function MKF(B) {
  return make_component(B, Face)
}
function MKE(B) {
  const e = make_component(B, Edge)
  e.pbody = B
  return e
}
function MKV(B) {
  return make_component(B, Vertex)
}
module.exports = {MKB, MKF, MKE, MKV}
