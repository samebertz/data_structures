const Node = require('./node')
const TYPES = require('./constants')
function Vertex(x,y,z) {
  this.type = TYPES.VERTEX
  this.x    = x
  this.y    = y
  this.z    = z
  this.ped  = null
}
Vertex.prototype = new Node
module.exports = Vertex
