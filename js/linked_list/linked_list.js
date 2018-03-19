function LinkedList() {
  this.head = null
  this.length = 0
}
LinkedList.prototype.search = function(k) {
  var x = this.head
  while(x !== null && x.key !== k) {
    x = x.next
  }
  return x
}
LinkedList.prototype.insert = function(x) {
  x.next = this.head
  if(this.head !== null)
    this.head.prev = x
  this.head = x
  this.length ++
}
LinkedList.prototype.delete = function(x) {
  if(x.next !== null)
    x.next.prev = x.prev
  if(x.prev === null)
    this.head = null
  else
    x.prev.next = x.next
  x.next = null
  x.prev = null
  this.length --
}
LinkedList.prototype.delete_key = function(k) {
  let node = this.search(k)
  this.delete(node)
}

module.exports = LinkedList
