const Node = require('./node')
// "ring" used informally in this paper will always mean a double pointer ring with a head
function Ring(head) {
  this.head = head
  this.head.next = this.head
  this.head.prev = this.head
  this.length = 1
}
Ring.prototype.insert = function(x) {
  x.next = this.head
  x.prev = this.head.prev
  this.head.prev.next = x
  this.head.prev = x
  this.length ++
}
Ring.prototype.delete = function(x) {
  x.prev.next = x.next
  x.next.prev = x.prev
  x.next = null
  x.prev = null
  this.length --
}
module.exports = Ring
