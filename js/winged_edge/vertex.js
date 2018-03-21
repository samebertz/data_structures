const Node = require('./node')
function Vertex(x,y,z) {
  this.x = x
  this.y = y
  this.z = z
  this.ped = null
}
Vertex.prototype = new Node
module.exports = Vertex
