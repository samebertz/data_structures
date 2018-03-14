const assert = require('assert')
const we = require('./winged_edge')

const WingedEdge  = we.WingedEdge
const Face        = we.Face
const Edge        = we.Edge
const Vertex      = we.Vertex

// test BFEV make operations
var f = new Face()
var e = new Edge()
var v = new Vertex()
// check block types
assert.strictEqual(f.type, we.TYPES.FACE)
assert.strictEqual(e.type, we.TYPES.EDGE)
assert.strictEqual(v.type, we.TYPES.VERTEX)
// check face block attributes
assert.ok(f.hasOwnProperty('nface'))
assert.ok(f.hasOwnProperty('pface'))
assert.ok(f.hasOwnProperty('ped'))
// check edge block attributes
assert.ok(e.hasOwnProperty('nface'))
assert.ok(e.hasOwnProperty('pface'))
assert.ok(e.hasOwnProperty('ned'))
assert.ok(e.hasOwnProperty('ped'))
assert.ok(e.hasOwnProperty('nvt'))
assert.ok(e.hasOwnProperty('pvt'))
assert.ok(e.hasOwnProperty('ncw'))
assert.ok(e.hasOwnProperty('pcw'))
assert.ok(e.hasOwnProperty('nccw'))
assert.ok(e.hasOwnProperty('pccw'))
// check face block attributes
assert.ok(v.hasOwnProperty('XWC'))
assert.ok(v.hasOwnProperty('YWC'))
assert.ok(v.hasOwnProperty('ZWC'))
assert.ok(v.hasOwnProperty('ped'))
assert.ok(v.hasOwnProperty('nvt'))
assert.ok(v.hasOwnProperty('pvt'))

/* Fetch Link and Store Link Operations.
// excerpt from "WINGED EDGE POLYHEDRON REPRESENTATION"
//
// Each of the fetch link and store link operations named in the
// summary is a single machine instruction that accesses the
// corresponding link position in a node. Once BFEV nodes exist, with
// their rings and parts-tree already in place; the fetch and store link
// operations are used to construct or modify a polyhedron's surface. At
// this lowest level, constructing a polyhedron requires three steps:
// first the two vertex and two face pointers are placed into each edge
// in counter clockwise order as they appear when that edge is viewed
// from the exterior of the solid; second an edge pointer is placed in
// each face and vertex, so that one can later get from a given face or
// vertex to one of its edges; and third the edge wings are linked so
// that all the ordered perimeter accessing operations described below
// will work. Wing linking is facilitated by the WING operation.
*/

// check store link operations
var faces = new Array(4)
var edges = new Array(4)
var vertices = new Array(4)

// check store face link operations for Faces
faces.fill(new Face())
// check store nface
Face.set_nface(faces[1], faces[0])
assert.ok(Object.is(faces[0].nface, faces[1])
assert.ok(Object.is(faces[1].pface, faces[0])
// check store pface
Face.set_pface(faces[3], faces[4])
assert.ok(Object.is(faces[4].pface, faces[3])
assert.ok(Object.is(faces[3].nface, faces[4])

// check store edge link operations for Edges
edges.fill(new Edge())
// check store ned
Edge.set_ned(edges[1], edges[0])
assert.ok(Object.is(edges[0].ned, edges[1])
assert.ok(Object.is(edges[1].ped, edges[0])
// check store ped
Edge.set_ped(edges[3], edges[4])
assert.ok(Object.is(edges[4].ped, edges[3])
assert.ok(Object.is(edges[3].ned, edges[4])

// check store vertex link operations for Vertices
vertices.fill(new Vertex())
// check store nvt
Vertex.set_nvt(vertices[1], vertices[0])
assert.ok(Object.is(vertices[0].nvt, vertices[1])
assert.ok(Object.is(vertices[1].pvt, vertices[0])
// check store pvt
Vertex.set_pvt(vertices[3], vertices[4])
assert.ok(Object.is(vertices[4].pvt, vertices[3])
assert.ok(Object.is(vertices[3].nvt, vertices[4])

// check store edge wing link operations for Edges
edges.fill(new Edge())
// check store ncw
Edge.set_ncw(edges[1], edges[0])
assert.ok(Object.is(edges[0].ncw, edges[1])
assert.ok(Object.is(edges[1].pcw, edges[0])
// check store pcw
Edge.set_pcw(edges[3], edges[4])
assert.ok(Object.is(edges[4].pcw, edges[3])
assert.ok(Object.is(edges[3].ncw, edges[4])
// check store nccw
Edge.set_nccw(edges[1], edges[0])
assert.ok(Object.is(edges[0].nccw, edges[1])
assert.ok(Object.is(edges[1].pccw, edges[0])
// check store pccw
Edge.set_pccw(edges[3], edges[4])
assert.ok(Object.is(edges[4].pccw, edges[3])
assert.ok(Object.is(edges[3].nccw, edges[4])

/* The Wing Link Operation.
// excerpt from "WINGED EDGE POLYHEDRON REPRESENTATION"
//
// The WING operation stores edge pointers into edges so that
// the face perimeters and vertex perimeters are made; and so that
// surface parity is preserved. Given two edges which have a vertex and
// a face in common, the WING operation places the first edge in the
// proper relationship (PCW, NCCW, NCW, or PCCW) with respect to the
// second, and the second in the proper relationship with respect to the
// first. The INVERT operation swaps the vertex, face, clockwise wing,
// and counter clockwise wing pointers of an edge. INVERT preserves
// surface parity, but flips edge parity
*/
