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
  // console.log('E1: ' + (E1 ? E1.pp_links() : E1))
  // console.log('E2: ' + (E2 ? E2.pp_links() : E2))
  // console.log('E3: ' + (E3 ? E3.pp_links() : E3))
  // console.log('E4: ' + (E4 ? E4.pp_links() : E4))
  // update face from F to fnew for perimeter of fnew
  let E = E2 || E1
  do {
    // console.log('updating '+E.pp())
    if(Object.is(E.pface,F))
      E.pface = fnew
    else
      E.nface = fnew
    E = Fetch.F.ECCW(E,fnew)
  } while(!Object.is(E, E4))
  // link wings for enew
  // console.log('E1 PRE: '+E1.pp_links())
  // console.log('ENEW: '+enew.pp_links())
  Link.wing(E1, enew)
  // console.log('E1: '+E1.pp_links())
  // console.log('ENEW: '+enew.pp_links())
  // console.log('E2 PRE: '+E2.pp_links())
  if(E2) Link.wing(E2, enew)
  // console.log('E2: '+E2.pp_links())
  // console.log('ENEW: '+enew.pp_links())
  // console.log('E3 PRE: '+E3.pp_links())
  Link.wing(E3, enew)
  // console.log('E3: '+E3.pp_links())
  // console.log('ENEW: '+enew.pp_links())
  // console.log('E4 PRE: '+E4.pp_links())
  if(E4) Link.wing(E4, enew)
  // console.log('E4: '+E4.pp_links())
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
function KLFE(E) {
  let kface = E.nface
  // console.log('killing face '+kface.pp()+' and edge '+E.pp())
  let F = E.pface
  // console.log('keeping face '+F.pp())
  // console.log('updating kface perimeter')
  let e2 = Fetch.F.ECW(E, kface)
  while(e2 !== E) {
    // console.log(e2.pp_links())
    if(Object.is(e2.nface, kface)) {
      e2.nface = F
      // console.log('^ updated nface')
      // console.log(e2.pp_links())
    } else {
      e2.pface = F
      // console.log('^ updated pface')
      // console.log(e2.pp_links())
    }
    e2 = Fetch.F.ECW(e2, kface)
  }
  // console.log('updating wing links')
  // console.log('for nvt end: '+E.pccw.pp()+' and '+E.ncw.pp())
  if(Object.is(E.pccw, E.ncw)) {
    if(Object.is(E.pccw.ncw, E)) {
      E.pccw.ncw = null
      E.pccw.pccw = null
    } else {
      E.pccw.nccw = null
      E.pccw.pcw = null
    }
  } else {
    Link.wing(E.pccw, E.ncw)
  }
  // console.log(E.pccw.pp_links())
  // console.log(E.ncw.pp_links())
  // console.log('for pvt end: '+E.pcw.pp()+' and '+E.nccw.pp())
  if(Object.is(E.pcw, E.nccw)) {
    if(Object.is(E.pcw.ncw, E)) {
      E.pcw.ncw = null
      E.pcw.pccw = null
    } else {
      E.pcw.nccw = null
      E.pcw.pcw = null
    }
  } else {
    Link.wing(E.pcw, E.nccw)
  }
  // console.log(E.pcw.pp_links())
  // console.log(E.nccw.pp_links())
  BFEV_MAKE.KLF(kface)
  BFEV_MAKE.KLE(E)
  return F
}

// 7. E 		← KLEV(VNEW); 	kill edge & Vertex leaving an edge.
function KLEV(V) {
  let kedge = V.ped,
      ecw = Fetch.V.ECW(kedge, V),
      eccw = Fetch.V.ECCW(kedge, V)
  // console.log(V.pp()+' ped: '+kedge.pp())
  // console.log((ecw?ecw.pp():'{null}')+' clockwise from '+
  //   kedge.pp()+' about '+V.pp())
  // console.log((eccw?eccw.pp():'{null}')+' counter-clockwise from '+
  //   kedge.pp()+' about '+V.pp())

  // TODO test this "unpyramid" loop
  if(ecw && eccw) {
    while(!Object.is(ecw, eccw)) {
      // console.log('KLFE on '+ecw.pp()+' in KLEV on '+V.pp())
      KLFE(ecw)
      ecw = Fetch.V.ECW(ecw, V)
    }
  }

  let patchvt = Object.is(kedge.nvt, V) ? kedge.pvt : kedge.nvt
  if(ecw) {
    if(Object.is(ecw.nvt, V)) {
      ecw.nvt = patchvt
    } else {
      ecw.pvt = patchvt
    }
  }

  // repair wing links for adjacent edges
  // first get adjacent edges
  // already have ecw and eccw about V
  // so get ecw and eccw about patchvt
  let ecw2 = Fetch.V.ECW(kedge, patchvt)
  let eccw2 = Fetch.V.ECCW(kedge, patchvt)
  Link.wing(ecw, eccw2)
  Link.wing(eccw, ecw2)

  BFEV_MAKE.KLV(V)
  BFEV_MAKE.KLE(kedge)
  return ecw
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
