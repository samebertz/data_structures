function Node(key, value) {
  this.key = key
  this.value = value
  this.next = null
  this.prev = null
}
function Ring() {
  this.head = null
  this.length = 0
}
Ring.prototype.search = function(k) {
  let x = this.head,
      i = 0
  while(x !== null && x.key !== k) {
    if(i >= this.length) return null
    x = x.next
    i++
  }
  return x
}
Ring.prototype.insert = function(x) {
  if(this.head === null) {
    x.next = x
    x.prev = x
    this.head = x
  } else {
    x.next = this.head
    x.prev = this.head.prev
    this.head.prev.next = x
    this.head.prev = x
  }
  this.length ++
}
Ring.prototype.delete = function(x) {
  if(this.length > 1) {
    if(this.head === x) {
      this.head = x.next
    }
    x.prev.next = x.next
    x.next.prev = x.prev
  } else {
    this.head = null
  }
  x.next = null
  x.prev = null
  this.length --
}

module.exports = { Node, Ring }
