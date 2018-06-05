const BFEV_MAKE = require('./BFEV_make_operations')
const MKB = BFEV_MAKE.MKB,
      MKF = BFEV_MAKE.MKF,
      MKE = BFEV_MAKE.MKE,
      MKV = BFEV_MAKE.MKV
const GETB = require('./parts_tree_accessing').GETB
const Fetch = require('./perimeter_fetch_operations')
const Link = require('./wing_link_operations')
const TYPES = require('./constants')

// 1. BNEW 	← MKBFV;			 	make a body, face & vertex.
function MKBFV() {
  const bnew = MKB()
  MKF(bnew)
  MKV(bnew)
  return bnew
}
// 2. KLBFEV(Q); 						kill a body & all its pieces.

// 3. VNEW 	← MKEV(F,V); 		make edge & vertex.
function MKEV(F, V) {
  const pbody = GETB(F)
  // console.log(pbody)
  const enew = MKE(pbody) // TODO: get body from FEV entities
  const vnew = MKV(pbody) // NOTE: assumes F has been linked to some edge
  enew.pvt = V
  enew.nvt = vnew
  vnew.ped = enew
  enew.pface = F
  enew.nface = F
  // TODO: deal with seminal vertex and wire polyhedra
  // seminal vertex only if F.ped and/or V.ped not set
  if(F.ped === null && V.ped === null) {
    F.ped = enew
    V.ped = enew
    enew.wire_neg = true
  // else if wire polyhedron
  } else if(V.ped.wire_neg) {
    // TODO
    enew.pcw = V.ped
    enew.nccw = V.ped
    V.ped.ncw = enew
    V.ped.pccw = enew
    V.ped.wire_neg = false
    enew.wire_neg = true
  } else {
    // get pcw and nccw wing links by finding edges shared by V and F,
    // whose clockwise and counter-clockwise face is F, respectively
    // start at an edge connected to V
    let E1 = V.ped
    // and also keep track of the next edge
    let E2 = Fetch.V.ECW(E1, V)
    // stop if the current edge has clockwise face of F
    while(!Object.is(Fetch.V.FCW(E1, V), F)) {
      // if not, update the current edge
      E1 = E2
      // and the next edge
      E2 = Fetch.V.ECW(E1, V)
    }
    // then link the wings
    Link.wing(E1, enew)
    if(E2 !== null)
      Link.wing(E2, enew)
  }
  return vnew
}

// 4. ENEW 	← MKFE(V1,F,V2); make face & edge.
// BUG: dependent on direction of edge when "closing" a wire polyhedron. XXX: just apply same restriction as on wire polyhedra that the ENEW can only "point" to the "positive" end (see figure 3.1 in README)
function MKFE(V1, F, V2) {
  const pbody = GETB(F)
  // create new primitives
  const fnew = MKF(pbody)
  const enew = MKE(pbody)
  // set vertex and face ptrs for enew
  enew.pvt = V1
  enew.nvt = V2
  enew.pface = F
  enew.nface = fnew
  // make enew accessible as ped on both F and fnew
  F.ped = enew
  fnew.ped = enew
  // find wings of enew
  let E1, E2 = V1.ped
  do {
    E1 = E2
    E2 = Fetch.V.ECW(E2, V1)
  } while (!Object.is(Fetch.V.FCW(E1, V1), F));
  // cont.
  let E3, E4 = V2.ped
  do {
    E3 = E4
    E4 = Fetch.V.ECW(E4, V2)
  } while(!Object.is(Fetch.V.FCW(E3, V2), F))
  // update face from F to fnew for perimeter of fnew
  let E = E2 || E1
  do {
    if(Object.is(E.pface,F))
      E.pface = fnew
    else
      E.nface = fnew
    E = Fetch.F.ECCW(E,fnew)
  } while(!Object.is(E, E4))
  // link wings for enew
  Link.wing(E1, enew)
  if(E2) Link.wing(E2, enew)
  Link.wing(E3, enew)
  if(E4) Link.wing(E4, enew)
  return enew
}

// 5. VNEW 	← ESPLIT(E); 		split an edge.
function ESPLIT(E) {
  // make vertex, edge, set new edge pvt and nvt and update old edge pvt or nvt, as well as set new edge pface and nface and wing pointers, and update old edge wing pointers
  const B = GETB(E)
  const VNEW = MKV(B),
        ENEW = MKE(B)
  ENEW.pvt = E.pvt
  ENEW.nvt = VNEW
  E.pvt = VNEW
  ENEW.nface = E.nface
  ENEW.pface = E.pface
  if(Object.is(ENEW.pvt.ped, E))
    ENEW.pvt.ped = ENEW
  VNEW.ped = ENEW
  Link.wing(ENEW, E.pcw)
  Link.wing(ENEW, E.nccw)
  E.nccw = ENEW
  E.pcw = ENEW
  ENEW.ncw = E
  ENEW.pccw = E
  return VNEW
  // And finally the operation of splitting an edge at a midpoint into two edges became so important in forming T-Joints during hidden line elimination that the ESPLIT primitive was Introduced in place of the equivalent KLFE, MKEV, MKFE sequence.
  // KLFE()
  // MKEV()
  // MKFE()
}

// 6. F			← KLFE(ENEW); 	kill face & edge leaving a face.
function KLFE(enew) {
  // retrieve all the links, essentially everything attached to enew in MKFE
  const F = enew.pface, fnew = enew.nface,
        V1 = enew.pvt, V2 = enew.nvt,
        E1 = enew.pcw, E2 = enew.nccw,
        E3 = enew.ncw, E4 = enew.pccw
  // replace enew if ped of face or vertex links
  if(Object.is(F.ped, enew)) F.ped = E3
  if(Object.is(V1.ped, enew)) V1.ped = E1
  if(Object.is(V2.ped, enew)) V2.ped = E3
  // starting with E2 and going ccw about fnew's perimeter, replace fnew with F
  let E = E2
  do {
    if(Object.is(E.pface, fnew))
      E.pface = F
    else
      E.nface = F
    E = Fetch.F.ECCW(E, fnew)
  } while(!Object.is(E, E4))
  // link wings for adjacent edges
  Link.wing(E1, E2)
  Link.wing(E3, E4)
  // kill entities and return "repaired" face
  BFEV_MAKE.KLF(fnew)
  BFEV_MAKE.KLE(enew)
  return F
}

// 7. E 		← KLEV(VNEW); 	kill edge & Vertex leaving an edge.
// TODO: "un-pyramid"
function KLEV(vnew) {
  const enew = vnew.ped,
        E = Fetch.V.ECCW(enew, vnew)
  // "un-pyramid"
  // TODO: delete remaining spur. just a diff logic when a pyramid i think.
  // since won't be patching E or anything, but will be patching anything
  // adjacent to enew that the KLFE calls didn't get.
  // maybe could devolve pyramid to a single split edge, KLEV that, then KLFE
  // the "repaired" edge?
  let E2 = Fetch.V.ECW(enew, vnew) || E,
      E3 = E2
  while(!Object.is(E2, E)) {
    KLFE(E2)
    E2 = Fetch.V.ECW(E3, vnew)
    E3 = E2
  }
  // orient edges as to match output of MKEV
  if(!Object.is(enew.nvt, vnew)) Link.invert(enew)
  if(!Object.is(E.pvt, vnew)) Link.invert(E)
  // link E to enew.pvt
  E.pvt = enew.pvt
  const V = E.pvt
  // link wings for newly adjacent edges
  Link.wing(E, enew.pcw)
  Link.wing(E, enew.nccw)
  // replace enew if ped of face or vertex links
  if(Object.is(V.ped, enew)) V.ped = E
  if(Object.is(E.nface.ped, enew)) E.nface.ped = E
  if(Object.is(E.pface.ped, enew)) E.pface.ped = E
  // kill entities and return "repaired" edge
  BFEV_MAKE.KLV(vnew)
  BFEV_MAKE.KLE(enew)
  return E
}

// 8. V 		← KLVE(ENEW); 	kill vertex & edge leaving a vertex.
function KLVE(E) {

}

// 9. B 		← GLUE(F1,F2); 	glue two faces together.
function GLUE(F1, F2) {

}

// 10. PNEW 	← UNGLUE(E); 		unglue along a seam containing E.
function UNGLUE(E) {

}

module.exports = { MKBFV, MKEV, MKFE, ESPLIT, KLFE, KLEV, KLVE, GLUE, UNGLUE }
