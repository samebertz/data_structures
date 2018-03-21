// requires
const WE = require('./winged_edge')
const WingedEdge = WE.WingedEdge
const Body = require('./body')
const Face = require('./face')
const Edge = require('./edge')
const Vertex = require('./vertex')
const Ring = require('./ring.js')
const Node = require('./node.js')
const Link = require('./wing-link')

// ========
// populate with some primitives

const TEST = new WingedEdge
// console.log('%O', TEST)

const faces = [
  // new Face(),
  // new Face(),
  // new Face(),
  new Face()
]
// console.log('%O', faces[0])
// console.log('%O', faces[0].__proto__)

for(face of faces) {
  WE.MKF(TEST)
}
// console.log('%O', TEST)
// console.log('%O', faces[0])
// console.log('%O', faces[0].__proto__)

const edges = [
  new Edge(),
  new Edge(),
  new Edge(),
  new Edge(),
  new Edge(),
  new Edge(),
  new Edge()
]
// console.log('%O', edges[0])
// console.log('%O', edges[0].__proto__)

for(edge of edges) {
  WE.MKE(TEST)
}
// console.log('%O', TEST)

const vertices = [
  new Vertex(0, 0, 0),
  new Vertex(1, 0, 0),
  new Vertex(1, 1, 0),
  new Vertex(0, 1, 0),
  new Vertex(2, 0, 0),
  new Vertex(2, 1, 0)
]
// console.log('%O', vertices[0])
// console.log('%O', vertices[0].__proto__)

for(vertex of vertices) {
  WE.MKV(TEST)
}
// console.log('%O', TEST)

// ========
// associate primitives
// console.log('%O', edges[6])

edges[0].nvt = vertices[1]
edges[0].pvt = vertices[0]
edges[0].pface = faces[0]

edges[1].nvt = vertices[2]
edges[1].pvt = vertices[1]
edges[1].nface = faces[1]
edges[1].pface = faces[0]
Link.WING(edges[0], edges[1])

edges[2].nvt = vertices[3]
edges[2].pvt = vertices[2]
edges[2].pface = faces[0]
Link.WING(edges[1], edges[2])

edges[3].nvt = vertices[0]
edges[3].pvt = vertices[3]
edges[3].pface = faces[0]
Link.WING(edges[2], edges[3])
Link.WING(edges[3], edges[0])

edges[4].nvt = vertices[4]
edges[4].pvt = vertices[1]
edges[4].pface = faces[1]
Link.WING(edges[4], edges[1])

edges[5].nvt = vertices[5]
edges[5].pvt = vertices[4]
edges[5].pface = faces[1]
Link.WING(edges[4], edges[5])

edges[6].nvt = vertices[2]
edges[6].pvt = vertices[5]
edges[6].pface = faces[1]
// console.log('%O', edges[6])
Link.WING(edges[5], edges[6])
Link.WING(edges[6], edges[1])
// console.log('%O', edges[6])

// console.log('%O', TEST)

// ========
