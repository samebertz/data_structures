const Node = require('./node')
const Ring = require('./ring')
const TYPES = require('../constants')
function Body() {
  function pp_with_type(type) {
    return function() {
      return type + ' Ring: ' + this.__proto__.pp.call(this)
    }
  }
  this.id = 0
  this.type = TYPES.BODY
  function create_ring_head() {
    const head = new Node
    head.type = TYPES.BODY
    head.id = this.id
    head.pbody = this
    return head
  }
  this.faces = Object.create(
    new Ring(create_ring_head.call(this)),
    {pp: {value: pp_with_type('F')}}
  )
  this.edges = Object.create(
    new Ring(create_ring_head.call(this)),
    {pp: {value: pp_with_type('E')}}
  )
  this.vertexs = Object.create(
    new Ring(create_ring_head.call(this)),
    {pp: {value: pp_with_type('V')}}
  )
  Object.defineProperties(this, {
    'nface': {
      get() {return this.faces.head.next},
      set(v) {this.faces.head.next = v}
    },
    'pface': {
      get() {return this.faces.head.prev},
      set(v) {this.faces.head.prev = v}
    },
    'ned': {
      get() {return this.edges.head.next},
      set(v) {this.edges.head.next = v}
    },
    'ped': {
      get() {return this.edges.head.prev},
      set(v) {this.edges.head.prev = v}
    },
    'nvt': {
      get() {return this.vertexs.head.next},
      set(v) {this.vertexs.head.next = v}
    },
    'pvt': {
      get() {return this.vertexs.head.prev},
      set(v) {this.vertexs.head.prev = v}
    },
  })
}
Body.prototype = new Node
module.exports = Body
