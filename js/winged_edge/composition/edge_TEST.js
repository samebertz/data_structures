const assert = require('assert')

function Node() {
  this.next = null
  this.prev = null
}

const Edge1Block = {
  ver: 'Edge1',
  data: null
}

function Edge1() {
  Object.assign(this,Edge1Block, new Node)
}

function Edge2() {
  return Object.assign(new Node, {
    ver: 'Edge2',
    data: null
  })
}

function Edge3() {
  this.ver = 'Edge3'
  this.data = null
}
Edge3.prototype = new Node

function Edge4() {
  this.ver = 'Edge4'
  this.data = null
  Object.assign(this, new Node)
}

let e1 = new Edge1
console.log('%O',e1)
let e2 = new Edge2
console.log('%O',e2)
let e3 = new Edge3
console.log('%O',e3)
let e4 = new Edge4
console.log('%O',e4)

function Ring(head) {
  this.head = head || null
  this.length = 0
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
    x.prev.next = x.next
    x.next.prev = x.prev
    x.next = null
    x.prev = null
    this.length --
  } else {
    this.head = null
    this.length = 0
  }
}

let r = new Ring
console.log('E1:\n====\n%O\n====',e1)
r.insert(e1)
console.log('E1:\n====\n%O\n====',e1)
// r.insert(e2)
// console.log('E2:\n====\n%O\n====',e2)
// r.insert(e3)
// console.log('E3:\n====\n%O\n====',e3)
// console.log('%O',r)
// r.delete(e2)
// console.log('%O',r)
