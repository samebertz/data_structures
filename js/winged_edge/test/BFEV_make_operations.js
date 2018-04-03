/***/ const Body = require('./primitives/body')
/***/ const Face = require('./primitives/face')
/***/ const Edge = require('./primitives/edge')
/***/ const Vertex = require('./primitives/vertex')

const GETB = require('./parts_tree_accessing').GETB

function MKB() {
  return new Body
}
function make_component(B, C) {
  const c = new C
  c.id = B[C.name.toLowerCase()+'s'].length
  B[C.name.toLowerCase()+'s'].insert(c)
  return c
}
function kill_component(C, T) {
  console.log(C.__proto__.constructor.name)
  // GETB(C)[C.name.toLowerCase()+'s'].delete(C)
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
function KLF(F) {
  return kill_component(F, Face)
}
function KLE(E) {
  return kill_component(E, Edge)
}
function KLV(V) {
  return kill_component(V, Vertex)
}
module.exports = {MKB, MKF, MKE, MKV, KLF, KLE, KLV}
