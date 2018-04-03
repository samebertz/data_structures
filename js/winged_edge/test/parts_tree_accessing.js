const TYPES = require('./constants')

// TEMP
function GETB(Q) {
  // console.log(Q.pp())
  switch(Q.type) {
    case TYPES.EDGE:
      // console.log('getting pbody from edge')
      return Q.pbody
    case TYPES.FACE:
    case TYPES.VERTEX:
      // console.log('searching for ring head')
      if(Q.ped) return Q.ped.pbody
      else
        while(Q.type !== TYPES.BODY) {
          Q = Q.next
        }
        return Q.pbody
    default:
      return null
  }
}

module.exports = {GETB}
