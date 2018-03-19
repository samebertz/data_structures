function Edge() {
  this.nface = this.pface = null
  // this.ned = this.ped = null
  this.nvt = this.pvt = null
  this.ncw = this.pcw = null
  this.nccw = this.pccw = null
}
Edge.prototype = new Node
