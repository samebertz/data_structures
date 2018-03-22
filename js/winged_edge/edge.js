const Node = require('./node')
const TYPES = require('./constants')
function Edge() {
  this.type  = TYPES.EDGE
  this.nface = this.pface = null
  this.nvt   = this.pvt   = null
  this.ncw   = this.pcw   = null
  this.nccw  = this.pccw  = null
}
Edge.prototype = new Node
module.exports = Edge
