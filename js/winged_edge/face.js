const Node = require('./node')
const TYPES = require('./constants')
function Face() {
  this.type = TYPES.FACE
  this.ped  = null
}
Face.prototype = new Node
module.exports = Face
