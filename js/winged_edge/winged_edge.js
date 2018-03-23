const Node = require('./node')
const Ring = require('./ring')

const Body = require('./body')
const Face = require('./face')
const Edge = require('./edge')
const Vertex = require('./vertex')

const TYPES = require('./constants')
}

function MKF(WE) {
  const f = new Face
  // console.log('%O', f)
  f.id = WE.faces.length
  // console.log('%O', f)
  WE.faces.insert(f)
  // console.log('%O', f)
}
function MKE(WE) {
  const e = new Edge
  e.id = WE.edges.length
  WE.edges.insert(e)
}
function MKV(WE) {
  const v = new Vertex
  v.id = WE.vertices.length
  WE.vertices.insert(v)
}

function WingedEdge() {
  this.faces = new Ring(new Body)
  this.edges = new Ring(new Body)
  this.vertices = new Ring(new Body)
}

module.exports = { WingedEdge, MKF, MKE, MKV}
