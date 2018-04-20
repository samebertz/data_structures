const Node = require('./node')
const TYPES = require('../constants')
function Edge() {
  this.type  = TYPES.EDGE
  this.nface = this.pface = null
  this.nvt   = this.pvt   = null
  this.ncw   = this.pcw   = null
  this.nccw  = this.pccw  = null
}
Edge.prototype = new Node
Edge.prototype.pp_links = function() {
  let str = '{\n\ttype: E, id: '+this.id
  str += ',\n\tpcw: '
  if(this.pcw)
    str += this.pcw.pp()
  else
    str += 'null'
  str += ',\n\tncw: '
  if(this.ncw)
    str += this.ncw.pp()
  else
    str += 'null'
  str += ',\n\tpccw: '
  if(this.pccw)
    str += this.pccw.pp()
  else
    str += 'null'
  str += ',\n\tnccw: '
  if(this.nccw)
    str += this.nccw.pp()
  else
    str += 'null'
  str += ',\n\tpface: '
  if(this.pface)
    str += this.pface.pp()
  else
    str += 'null'
  str += ',\n\tnface: '
  if(this.nface)
    str += this.nface.pp()
  else
    str += 'null'
  str += ',\n\tpvt: '
  if(this.pvt)
    str += this.pvt.pp()
  else
    str += 'null'
  str += ',\n\tnvt: '
  if(this.nvt)
    str += this.nvt.pp()
  else
    str += 'null'
  return str + '\n}'
}
module.exports = Edge
