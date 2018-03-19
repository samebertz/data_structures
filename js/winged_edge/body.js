function Body() {
  Object.defineProperty(
    this,
    'nface'
  )
}
Body.prototype = new Node
module.exports = Body
