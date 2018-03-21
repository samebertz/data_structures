const Node = require('./node')
function Face() {
  this.ped = null
}
Face.prototype = new Node
module.exports = Face
