// const WE = require('./winged_edge')
// const WingedEdge = WE.WingedEdge
const TYPES = require('./constants')
const Body = require('./primitives/body')
const Face = require('./primitives/face')
const Edge = require('./primitives/edge')
const Vertex = require('./primitives/vertex')
const Ring = require('./primitives/ring')
const Node = require('./primitives/node')
const BFEV_Make = require('./BFEV_make_operations')
const MKF = BFEV_Make.MKF,
      MKE = BFEV_Make.MKE,
      MKV = BFEV_Make.MKV
const Link = require('./wing_link_operations')
const Fetch = require('./perimeter_fetch_operations')
const Euler = require('./euler_primitives')

const test = new Body
// console.log('testing BFEV_make_operations')
// console.log(test)
let test_face = MKF(test)
// console.log(test_face)
// console.log(test.faces.pp())
let test_edge = MKE(test)
// console.log(test_edge)
// console.log(test.edges.pp())
let test_edge2 = MKE(test)
// console.log(test_edge2.pp())
// console.log(test.edges.pp())
let test_face2 = MKF(test)
// console.log(test.faces.pp())
let test_face3 = MKF(test)
// console.log(test.faces.pp())
let test_vertex = MKV(test)
// console.log(test.vertexs.pp())
let test_vertex2 = MKV(test)
// console.log(test.vertexs.pp())
let test_vertex3 = MKV(test)
// console.log(test.vertexs.pp())
// console.log(test.nface.pp())
// console.log('done testing BFEV_make_operations\n========')

// console.log('testing wing_link_operations')
// console.log(test_edge.pp_links())
// console.log(test_edge2.pp_links())
test_edge.pvt = test_vertex
test_edge.nvt = test_vertex2
test_edge2.pvt = test_vertex2
test_edge2.nvt = test_vertex3
test_edge.nface = test_face
test_edge.pface = test_face2
test_edge2.nface = test_face
test_edge2.pface = test_face3
// console.log(test_edge.pp_links())
// console.log(test_edge2.pp_links())
Link.wing(test_edge, test_edge2)
// console.log(test_edge.pp_links())
// console.log(test_edge2.pp_links())
// console.log('done testing wing_link_operations\n========')

// console.log('testing perimeter_fetch_operations')
// console.log(Fetch.V.ECCW(test_edge, test_vertex2).pp())
// console.log(Fetch.V.ECW(test_edge2, test_vertex2).pp())
// console.log(Fetch.V.FCW(test_edge2, test_vertex2).pp())
// console.log(Fetch.V.FCCW(test_edge2, test_vertex2).pp())
// console.log(Fetch.F.ECCW(test_edge2, test_face).pp())
// console.log(Fetch.F.ECW(test_edge, test_face).pp())
// console.log(Fetch.F.VCW(test_edge, test_face2).pp())
// console.log(Fetch.F.VCCW(test_edge2, test_face).pp())
// console.log('done testing perimeter_fetch_operations\n========')

console.log('testing euler_primitives')
let test_bfv = Euler.MKBFV()
// console.log('%O',test_bfv)
console.log(test_bfv.pp(), test_bfv.nface.pp(), test_bfv.nvt.pp())
console.log(test_bfv.faces.pp())
console.log(test_bfv.edges.pp())
console.log(test_bfv.vertexs.pp())
let test_mkev_vnew = Euler.MKEV(test_bfv.nface, test_bfv.nvt)
// console.log(test_mkev_vnew.pp())
let test_mkev_enew = test_mkev_vnew.ped
// console.log(test_mkev_enew.pp_links())
// console.log('%O',test_bfv)
// console.log(test_bfv.faces.pp())
// console.log(test_bfv.edges.pp())
// console.log(test_bfv.vertexs.pp())
let test_mkev_vnew2 = Euler.MKEV(test_bfv.nface, test_mkev_vnew)
// console.log(test_mkev_vnew2.pp())
let test_mkev_enew2 = test_mkev_vnew2.ped
// console.log(test_mkev_enew.pp_links())
// console.log(test_mkev_enew2.pp_links())
// console.log(test_bfv.faces.pp())
// console.log(test_bfv.edges.pp())
// console.log(test_bfv.vertexs.pp())
let test_mkev_vnew3 = Euler.MKEV(test_bfv.nface, test_mkev_vnew2)
// console.log(test_mkev_vnew3.pp())
let test_mkev_enew3 = test_mkev_vnew3.ped
// console.log(test_mkev_enew.pp_links())
// console.log(test_mkev_enew2.pp_links())
// console.log(test_mkev_enew3.pp_links())
// console.log(test_bfv.faces.pp())
// console.log(test_bfv.edges.pp())
// console.log(test_bfv.vertexs.pp())
// let test_mkev_vnew4 = Euler.MKEV(test_bfv.nface, test_mkev_vnew3)
// console.log(test_mkev_vnew4.pp())
// let test_mkev_enew4 = test_mkev_vnew4.ped
// console.log(test_mkev_enew3.pp_links())
// console.log(test_mkev_enew4.pp_links())
// console.log(test_mkev_enew.pp_links())
// console.log(test_mkev_enew2.pp_links())
// console.log(test_mkev_enew3.pp_links())
let test_mkfe_enew = Euler.MKFE(test_bfv.nvt, test_bfv.nface, test_mkev_vnew3)
// console.log(test_mkfe_enew.pp())
// console.log(test_mkev_enew.pp_links())
// console.log(test_mkev_enew2.pp_links())
// console.log(test_mkev_enew3.pp_links())
// console.log(test_mkfe_enew.pp_links())
let test_mkfe_fnew = test_mkfe_enew.nface
// console.log(test_mkfe_fnew.pp())
// let test_klfe_f = Euler.KLFE(test_mkfe_enew)
// console.log(test_mkfe_fnew.ped.pp_links())
// console.log(Object.is(test_bfv.nface, test_klfe_f))
// console.log(test_klfe_f.pp())
console.log(test_mkev_enew.pp_links())
console.log(test_mkev_enew2.pp_links())
console.log(test_bfv.edges.pp())
let test_esplit_vnew = Euler.ESPLIT(test_mkev_enew2)
let test_esplit_enew = test_esplit_vnew.ped
console.log(test_mkev_enew.pp_links())
console.log(test_esplit_enew.pp_links())
console.log(test_mkev_enew2.pp_links())
console.log(test_bfv.edges.pp())
console.log('done testing euler_primitives\n========')

// =============

// // requires
// const WE = require('./winged_edge')
// const WingedEdge = WE.WingedEdge
// const Body = require('./body')
// const Face = require('./face')
// const Edge = require('./edge')
// const Vertex = require('./vertex')
// const Ring = require('./ring.js')
// const Node = require('./node.js')
// const Link = require('./wing-link')
//
// // ========
// // populate with some primitives
//
// const TEST = new WingedEdge
// // console.log('%O', TEST)
//
// const faces = [
//   // new Face(),
//   // new Face(),
//   // new Face(),
//   new Face()
// ]
// // console.log('%O', faces[0])
// // console.log('%O', faces[0].__proto__)
//
// for(face of faces) {
//   WE.MKF(TEST)
// }
// // console.log('%O', TEST)
// // console.log('%O', faces[0])
// // console.log('%O', faces[0].__proto__)
//
// const edges = [
//   new Edge(),
//   new Edge(),
//   new Edge(),
//   new Edge(),
//   new Edge(),
//   new Edge(),
//   new Edge()
// ]
// // console.log('%O', edges[0])
// // console.log('%O', edges[0].__proto__)
//
// for(edge of edges) {
//   WE.MKE(TEST)
// }
// // console.log('%O', TEST)
//
// const vertices = [
//   new Vertex(0, 0, 0),
//   new Vertex(1, 0, 0),
//   new Vertex(1, 1, 0),
//   new Vertex(0, 1, 0),
//   new Vertex(2, 0, 0),
//   new Vertex(2, 1, 0)
// ]
// // console.log('%O', vertices[0])
// // console.log('%O', vertices[0].__proto__)
//
// for(vertex of vertices) {
//   WE.MKV(TEST)
// }
// // console.log('%O', TEST)
//
// // ========
// // associate primitives
// // console.log('%O', edges[6])
//
// edges[0].nvt = vertices[1]
// edges[0].pvt = vertices[0]
// edges[0].pface = faces[0]
//
// edges[1].nvt = vertices[2]
// edges[1].pvt = vertices[1]
// edges[1].nface = faces[1]
// edges[1].pface = faces[0]
// Link.WING(edges[0], edges[1])
//
// edges[2].nvt = vertices[3]
// edges[2].pvt = vertices[2]
// edges[2].pface = faces[0]
// Link.WING(edges[1], edges[2])
//
// edges[3].nvt = vertices[0]
// edges[3].pvt = vertices[3]
// edges[3].pface = faces[0]
// Link.WING(edges[2], edges[3])
// Link.WING(edges[3], edges[0])
//
// edges[4].nvt = vertices[4]
// edges[4].pvt = vertices[1]
// edges[4].pface = faces[1]
// Link.WING(edges[4], edges[1])
//
// edges[5].nvt = vertices[5]
// edges[5].pvt = vertices[4]
// edges[5].pface = faces[1]
// Link.WING(edges[4], edges[5])
//
// edges[6].nvt = vertices[2]
// edges[6].pvt = vertices[5]
// edges[6].pface = faces[1]
// // console.log('%O', edges[6])
// Link.WING(edges[5], edges[6])
// Link.WING(edges[6], edges[1])
// // console.log('%O', edges[6])
//
// // console.log('%O', TEST)
//
// // ========
