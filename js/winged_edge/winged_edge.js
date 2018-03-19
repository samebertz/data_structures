const Node = require('./node')
const Ring = require('./ring')

const Face = require('./face')
const Edge = require('./edge')
const Vertex = require('./vertex')

const TYPES = {
  BODY: -1,
  FACE: 0,
  EDGE: 1,
  VERTEX: 2
}

// function Face() {
//   this.type = TYPES.FACE
//   this.nface = this.pface = null
//   this.ped = null
// }

// function Edge() {
//   this.type = TYPES.EDGE
//   this.nface = this.pface = null
//   this.ned = this.ped = null
//   this.nvt = this.pvt = null
//   this.ncw = this.pcw = null
//   this.nccw = this.pccw = null
// }

// function Vertex(x, y, z) {
//   this.x = x
//   this.y = y
//   this.z = z
//   this.type = TYPES.VERTEX
//   this.ped = null
//   this.nvt = this.pvt = null
// }

function WingedEdge(body) {
  this.faces = new Ring(body)
  this.edges = new Ring(body)
  this.vertices = new Ring(body)
}

module.exports = { WingedEdge, Face, Edge, Vertex , TYPES}
