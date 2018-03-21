const Node = require('./node')
function Body() {
  this.id = 0
  // function get_next() {
  //   return this.next
  // }
  // function set_next(value) {
  //   this.next = value
  // }
  // function get_prev() {
  //   return this.prev
  // }
  // function set_prev(value) {
  //   this.prev = value
  // }
  // Object.defineProperties(this, {
  //   'nface': {
  //     get: get_next,
  //     set: set_next
  //   },
  //   'pface': {
  //     get: get_prev,
  //     set: set_prev
  //   },
  //   'ned': {
  //     get: get_next,
  //     set: set_next
  //   },
  //   'ped': {
  //     get: get_prev,
  //     set: set_prev
  //   },
  //   'nvt': {
  //     get: get_next,
  //     set: set_next
  //   },
  //   'pvt': {
  //     get: get_prev,
  //     set: set_prev
  //   }
  // })
}
Body.prototype = new Node
module.exports = Body
