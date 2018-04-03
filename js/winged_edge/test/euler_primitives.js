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
function MKFE(V1, F, V2) {
  const pbody = GETB(F)
  const fnew = MKF(pbody)
  const enew = MKE(pbody)
  enew.pvt = V1
  enew.nvt = V2
  enew.pface = F
  enew.nface = fnew
  console.log(enew.pp_links())
  F.ped = enew
  fnew.ped = enew
  // get wings of new edge
  // first, get pcw by finding edge shared by V1 and F whose clockwise face is F
  // start at an edge connected to V1
  let E1 = V1.ped
  console.log('E1: '+E1.pp_links())
  // and also keep track of the "old" next edge
  let E2 = Fetch.V.ECW(E1, V1) || E1
  // console.log(E2.pp())
  console.log('E2: '+E2.pp_links())
  // stop if the current edge has clockwise face of F
  while(!Object.is(Fetch.V.FCW(E1, V1), F)) {
    // if not, update the current edge
    E1 = E2
    // and the next edge
    E2 = Fetch.V.ECW(E1, V1)
  }
  // do the same for V2
  let E3 = V2.ped
  let E4 = Fetch.V.ECW(E3, V2) || E3
  while(!Object.is(Fetch.V.FCW(E3, V2), F)) {
    E3 = E4
    E4 = Fetch.V.ECW(E3, V2)
  }
  console.log('E3: '+E3.pp_links())
  console.log('E4: '+E4.pp_links())
  // update face pointers for all edges of F that are now adjacent to FNEW
  // SCAN CCW FROM V1 REPLACING F'S WITH FNEW;
  // E←E2
  // DO IF PFACE(E)=FACE THEN PFACE(E)←FNEW
  //  ELSE NFACE(E)←FNEW;
  // UNTIL E4=(E←ECCW(E,FNEW));
  // start at E2
  let E = E2
  console.log('E: '+E.pp_links())
  // update appropriate face pointer to FNEW
  if(Object.is(E.pface,F))
    E.pface = fnew
  else
    E.nface = fnew
  console.log('E: '+E.pp_links())
  // continue for each edge counter-clockwise about FNEW until E4,
  // which is still adjacent to F
  E = Fetch.F.ECCW(E,fnew)
  console.log('E: '+E.pp_links())
  while(!Object.is(E, E4)) {
    if(Object.is(E.pface,F))
      E.pface = fnew
    else
      E.nface = fnew
    E = Fetch.F.ECCW(E,fnew)
  }
  // then set the wing links for ENEW
  Link.wing(E1, enew)
  Link.wing(E2, enew)
  Link.wing(E3, enew)
  Link.wing(E4, enew)
  return enew
}
// 5. VNEW 	← ESPLIT(E); 		split an edge.
// 6. F			← KLFE(ENEW); 	kill face & edge leaving a face.
// 7. E 		← KLEV(VNEW); 	kill edge & Vertex leaving an edge.
// 8. V 		← KLVE(ENEW); 	kill vertex & edge leaving a vertex.
// 9. B 		← GLUE(F1,F2); 	glue two faces together.
// 10. PNEW 	← UNGLUE(E); 		unglue along a seam containing E.

module.exports = { MKBFV, MKEV, MKFE }
