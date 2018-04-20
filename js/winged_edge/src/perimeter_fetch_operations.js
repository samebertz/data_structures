// Face Perimeter Accessing w.r.t Edge E (paper Figure 2.5)
const F = {
/***/ // E ← ECW(E, F);
/***/ // Get Edge Clockwise from E about F's perimeter.
/***/ ECW: function(E, F) {
/***/   return Object.is(E.nface, F) ? E.ncw : E.pcw
/***/ },
/***/ // E ← ECCW(E, F);
/***/ // Get Edge Counter Clockwise from E about F's perimeter.
/***/ ECCW: function(E, F) {
/***/   return Object.is(E.nface, F) ? E.nccw : E.pccw
/***/ },
/***/ // V ← VCW(E, F);
/***/ // Get the vertex clockwise from E about F.
/***/ VCW: function(E, F) {
/***/   return Object.is(E.nface, F) ? E.nvt : E.pvt
/***/ },
/***/ // V ← VCCW(E, F);
/***/ // Get the vertex counter clockwise from E about F.
/***/ VCCW: function(E, F) {
/***/   return Object.is(E.nface, F) ? E.pvt : E.nvt
/***/ }
}

// Vertex Perimeter Accessing w.r.t Edge E (paper Figure 2.6)
const V = {
/***/ // E ← ECW(E, V);
/***/ // Get Edge Clockwise from E about V's perimeter.
/***/ ECW: function(E, V) {
        // console.log('fetching edge clockwise from '+E.pp()+' about '+V.pp())
/***/   return Object.is(E.nvt, V) ? E.pccw : E.nccw
/***/ },
/***/ // E ← ECCW(E, V);
/***/ // Get Edge Counter Clockwise from E about V's perimeter.
/***/ ECCW: function(E, V) {
/***/   return Object.is(E.nvt, V) ? E.ncw : E.pcw
/***/ },
/***/ // F ← FCW(E, V);
/***/ // Get the face clockwise from E about V
/***/ FCW: function(E, V) {
/***/   return Object.is(E.nvt, V) ? E.pface : E.nface
/***/ },
/***/ // F ← FCCW(E, V);
/***/ // Get the face counter clockwise from E about V.
/***/ FCCW: function(E, V) {
/***/   return Object.is(E.nvt, V) ? E.nface : E.pface
/***/ }
}

Object.assign(F, {
// F ← OTHER(E, F);
// Get the other face of an edge.
OTHER: function(E, F) {
  return Object.is(E.nface, F) ? E.pface : E.nface
}
})
Object.assign(V, {
// V ← OTHER(E, V);
// Get the other vertex of an edge.
OTHER: function(E, V) {
  return Object.is(E.nvt, F) ? E.pvt : E.nvt
}
})

module.exports = {F, V}
