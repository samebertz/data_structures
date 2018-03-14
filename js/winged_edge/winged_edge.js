const ring = require('../ring')
const Node = ring.Node
const Ring = ring.Ring

const TYPES = {
  BODY: -1,
  FACE: 0,
  EDGE: 1,
  VERTEX: 2
}
function Face() {
  // type
  // PED
  // NFACE, PFACE
}
function Edge() {
  // type
  // NFACE, PFACE, NVT, PVT
  // NED, PED
  // NCW, PCW, NCCW, PCCW
}
function Vertex() {
  // type
  // PED
  // NVT, PVT
}

function WING() {}

function WingedEdge() {
  this.faces = new Ring()
  this.edges = new Ring()
  this.vertices = new Ring()
}
WingedEdge.prototype.f = function() {
}

module.exports = { WingedEdge, Face, Edge, Vertex , TYPES}
