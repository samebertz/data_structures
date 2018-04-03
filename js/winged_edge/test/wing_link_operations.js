function wing(E1, E2) {
  // console.log('E1: '+E1.pp_links())
  // console.log('E2: '+E2.pp_links())
  // taking advantage of the symmetry here
  // ? commutativity of the binary functions ?
  // or something... anyway essentially there's
  // rotational symmetry between the four pairs
  // of possible relations between connected Edges
  // E1 and E2 which share both a Vertex and a Face
  // e.g. E1 leading into E2 and sharing a left Face
  //      is symmetric to
  //      E2 leading into E1 and sharing a left Face
  // and similarly for each of: sharing a right face,
  // sharing an end vertex, and sharing a start vertex
  function leads_right(E1, E2) {
    if (E1.nvt == E2.pvt && E1.nface == E2.nface) {
      E1.ncw = E2
      E2.nccw = E1
    }
  }
  function leads_left(E1, E2) {
    if (E1.nvt == E2.pvt && E1.pface == E2.pface) {
      E1.pcw = E2
      E2.pccw = E1
    }
  }
  function abut(E1, E2) {
    if (E1.nvt == E2.nvt && E1.nface == E2.pface) {
      E1.ncw = E2
      E2.pccw = E1
    }
  }
  function spread(E1, E2) {
    if (E1.pvt == E2.pvt && E1.nface == E2.pface) {
      E1.nccw = E2
      E2.pcw = E1
    }
  }

  /***/ leads_right(E1, E2)
  /***/ leads_right(E2, E1)
  /***/
  /***/ leads_left(E1, E2)
  /***/ leads_left(E2, E1)
  /***/
  /***/ abut(E1, E2)
  /***/ abut(E2, E1)
  /***/
  /***/ spread(E1, E2)
  /***/ spread(E2, E1)
}

function invert(E) {
  let t = E.nvt
  E.nvt = E.pvt
  E.pvt = t
  t = E.nface
  E.nface = E.pface
  E.pface = t
  t = E.ncw
  E.ncw = E.pcw
  E.pcw = t
  t = E.nccw
  E.nccw = E.pccw
  E.pccw = t
}

module.exports = { wing, invert }
