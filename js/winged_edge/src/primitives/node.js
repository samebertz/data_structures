const TYPES = require('../constants')
function Node() {
  this.id   = null
  this.next = null
  this.prev = null
}
// TEMP: pretty print
Node.prototype.pp = function() {
	let str = '{type: '
  switch (this.type) {
    case TYPES.BODY:
      str += 'B'
      break
    case TYPES.FACE:
      str += 'F'
      break
    case TYPES.EDGE:
      str += 'E'
      break
    case TYPES.VERTEX:
      str += 'V'
      break
    default:
      str += '?'
  }
  return str+', '+'id: '+this.id+'}'
}
module.exports = Node
