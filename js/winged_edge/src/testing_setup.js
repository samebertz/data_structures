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

function make_wire_polyhedron(segments) {
  console.log(`making wire polyhedron with ${segments} segments`)
  const bfv = Euler.MKBFV()
  for(let i=0; i<segments; i++) {
    Euler.MKEV(bfv.nface, bfv.pvt)
  }
  return bfv
}

function make_lamina_polyhedron_from_wire(wire) {
  console.log(`making lamina polyhedron from wire ${wire.pp()}`)
  const pos = wire.nvt,
        neg = wire.pvt,
        f = wire.nface
  Euler.MKFE(pos, f, neg)
  return wire
}

function make_lamina_polyhedron(edges) {
  console.log(`making wire polyhedron with ${edges} edges`)
  const wire = make_wire_polyhedron(edges)
  return make_lamina_polyhedron_from_wire(wire)
}

console.log('========')
console.log('make wire polyhedron with 4 segments:')
const wire_4 = make_wire_polyhedron(4)
console.log('%O', wire_4)
console.log(wire_4.faces.pp())
console.log(wire_4.edges.pp())
console.log(wire_4.vertexs.pp())
let e = wire_4.ned
// do {
//   console.log(e.pp_links())
//   e = e.ned
// } while(!Object.is(e, wire_4.edges.head))

console.log('========')
console.log('make lamina polyhedron from wire with 4 segments:')
const lamina_from_wire_4 = make_lamina_polyhedron_from_wire(wire_4)
console.log('%O', lamina_from_wire_4)
console.log(lamina_from_wire_4.faces.pp())
console.log(lamina_from_wire_4.edges.pp())
console.log(lamina_from_wire_4.vertexs.pp())
e = lamina_from_wire_4.ned
// do {
//   console.log(e.pp_links())
//   e = e.ned
// } while(!Object.is(e, lamina_from_wire_4.edges.head))

console.log('========')
console.log('make lamina polyhedron with 3 edges:')
const lamina_3 = make_lamina_polyhedron(3)
console.log('%O', lamina_3)
console.log(lamina_3.faces.pp())
console.log(lamina_3.edges.pp())
console.log(lamina_3.vertexs.pp())
e = lamina_3.ned
do {
  console.log(e.pp_links())
  e = e.ned
} while(!Object.is(e, lamina_3.edges.head))

// let test_mkev_vnew4 = Euler.MKEV(test_bfv.nface, test_mkev_vnew3)
// let test_mkev_enew4 = test_mkev_vnew4.ped
// let test_mkfe_enew = Euler.MKFE(test_bfv.nvt, test_bfv.nface, test_mkev_vnew3)
// let test_mkfe_fnew = test_mkfe_enew.nface
// let test_klfe_f = Euler.KLFE(test_mkfe_enew)
// let test_esplit_vnew = Euler.ESPLIT(test_mkev_enew2)
// let test_esplit_enew = test_esplit_vnew.ped
// let test_mkev_vnew_p = Euler.MKEV(test_bfv.nface, test_mkev_vnew)
// let test_mkev_enew_p1 = test_mkev_vnew_p.ped
//
// let test_mkfe_enew_p2 = Euler.MKFE(test_mkev_vnew2, test_bfv.nface, test_mkev_vnew_p)
// let test_mkfe_fnew_p1 = test_mkfe_enew_p2.nface
//
// let test_mkfe_enew_p3 = Euler.MKFE(test_mkev_vnew3, test_bfv.nface, test_mkev_vnew_p)
// let test_mkfe_fnew_p2 = test_mkfe_enew_p3.nface
//
// let test_mkfe_enew_p4 = Euler.MKFE(test_bfv.nvt, test_bfv.nface, test_mkev_vnew_p)
// let test_mkfe_fnew_p3 = test_mkfe_enew_p4.nface
// let test_klev_e = Euler.KLEV(test_mkev_vnew_p)
//
// let test2_bfv = Euler.MKBFV()
// let test2_mkev_vnew = Euler.MKEV(test2_bfv.nface, test2_bfv.nvt)
// let test2_mkev_enew = test2_mkev_vnew.ped
// let test2_mkev_vnew2 = Euler.MKEV(test2_bfv.nface, test2_mkev_vnew)
// let test2_mkev_enew2 = test2_mkev_vnew2.ped
// let test2_klev_e = Euler.KLEV(test2_mkev_vnew2)
//
