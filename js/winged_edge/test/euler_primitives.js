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
// BUG: dependent on direction of edge when "closing" a wire polyhedron. XXX: just apply same restriction as on wire polyhedra that the ENEW can only start from the "positive" end (see figure 3.1 in README)
function MKFE(V1, F, V2) {
  // console.log('V1: ',V1.pp())
  // console.log('V2: ',V2.pp())
  const pbody = GETB(F)
  const fnew = MKF(pbody)
  const enew = MKE(pbody)
  enew.pvt = V1
  enew.nvt = V2
  // const _ecw = Fetch.V.ECW(enew, V1)
  enew.pface = F
  enew.nface = fnew
  // console.log(enew.pp_links())
  F.ped = enew
  fnew.ped = enew
  // get wings of new edge
  // first, get pcw by finding edge shared by V1 and F whose clockwise face is F
  // start at an edge connected to V1
  let E1 = V1.ped
  // console.log('E1: '+E1.pp_links())
  // and also keep track of the "old" next edge
  let E2 = Fetch.V.ECW(E1, V1) || E1
  // console.log(E2.pp())
  // console.log('E2: '+(Object.is(E2, E1)?'E1':E2.pp_links()))
  // stop if the current edge has clockwise face of F
  // console.log('FCW(E1,V1) = ',Fetch.V.FCW(E1, V1).pp())
  while(!Object.is(Fetch.V.FCW(E1, V1), F)) {
    // if not, update the current edge
    E1 = E2
    // and the next edge
    E2 = Fetch.V.ECW(E1, V1)
  }
  // do the same for V2
  let E3 = V2.ped
  // console.log('E3: '+E3.pp_links())
  let E4 = Fetch.V.ECW(E3, V2) || E3
  // console.log('E4: '+(Object.is(E4, E3)?'E3':E4.pp_links()))
  // console.log('FCW(E3,V2) = ',Fetch.V.FCW(E3, V2).pp())
  while(!Object.is(Fetch.V.FCW(E3, V2), F)) {
    E3 = E4
    E4 = Fetch.V.ECW(E3, V2)
  }
  // console.log('E3: '+E3.pp_links())
  // console.log('E4: '+E4.pp_links())
  // update face pointers for all edges of F that are now adjacent to FNEW
  // SCAN CCW FROM V1 REPLACING F'S WITH FNEW;
  // E←E2
  // DO IF PFACE(E)=FACE THEN PFACE(E)←FNEW
  //  ELSE NFACE(E)←FNEW;
  // UNTIL E4=(E←ECCW(E,FNEW));
  // start at E2
  let E = E2
  // console.log('E before update face: '+E.pp_links())
  // update appropriate face pointer to FNEW
  if(Object.is(E.pface,F))
    E.pface = fnew
  else
    E.nface = fnew
  // console.log('E after update face: '+E.pp_links())
  // continue for each edge counter-clockwise about FNEW until E4,
  // which is still adjacent to F
  // E = Fetch.F.ECCW(E,fnew)
  // console.log('E before update face: '+E.pp_links())
  while(!Object.is(E, E4)) {
    E = Fetch.F.ECCW(E,fnew)
    // console.log('E before update face: '+E.pp_links())
    if(Object.is(E.pface,F))
      E.pface = fnew
    else
      E.nface = fnew
    // console.log('E after update face: '+E.pp_links())
  }
  // console.log('E: '+E.pp_links())
  // console.log('E1: '+E1.pp_links())
  // console.log('E2: '+E2.pp_links())
  // console.log('E3: '+E3.pp_links())
  // console.log('E4: '+E4.pp_links())
  // then set the wing links for ENEW
  Link.wing(E1, enew)
  // console.log('E1: '+E1.pp_links())
  // console.log('ENEW: '+enew.pp_links())
  Link.wing(E2, enew)
  // console.log('E2: '+(Object.is(E2, E1)?'E1':E2.pp_links()))
  // console.log('ENEW: '+enew.pp_links())
  Link.wing(E3, enew)
  // console.log('E3: '+E3.pp_links())
  // console.log('ENEW: '+enew.pp_links())
  Link.wing(E4, enew)
  // console.log('E4: '+(Object.is(E4, E3)?'E3':E4.pp_links()))
  // console.log('ENEW: '+enew.pp_links())
  return enew
}

// 5. VNEW 	← ESPLIT(E); 		split an edge.
function ESPLIT(E) {
  // make vertex, edge, set new edge pvt and nvt and update old edge pvt or nvt, as well as set new edge pface and nface and wing pointers, and update old edge wing pointers
  const VNEW = MKV(),
        ENEW = MKE()
  ENEW.nvt = E.nvt
  ENEW.pvt = VNEW
  E.nvt = VNEW
  ENEW.nface = E.nface
  ENEW.pface = E.pface
  ENEW.ncw = E.ncw
  ENEW.pccw = E.pccw
  ENEW.pcw = E
  ENEW.nccw = E
  E.ncw = ENEW
  E.pccw = ENEW
  VNEW.ped = E
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
